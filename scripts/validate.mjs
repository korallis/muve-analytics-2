#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";

const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: "1",
  PYTHONPATH: [process.cwd() + "/pipeline", process.env.PYTHONPATH].filter(Boolean).join(":"),
};
let failures = 0;

function result(name, passed, detail = "") {
  const suffix = detail ? ` — ${detail}` : "";
  console.log(`[CHECK] ${name} ... ${passed ? "PASS" : "FAIL"}${suffix}`);
  if (!passed) failures += 1;
}

function commandCheck(name, command, args) {
  const completed = spawnSync(command, args, {
    cwd: process.cwd(),
    env,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
  const passed = completed.status === 0;
  result(name, passed, passed ? "exit 0" : `exit ${completed.status ?? "unknown"}`);
  if (!passed) {
    const output = `${completed.stdout ?? ""}\n${completed.stderr ?? ""}`.trim();
    if (output) console.log(output);
  }
  return passed;
}

async function waitForServer(url, attempts = 50) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status < 500) return true;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

async function validateRuntime() {
  const port = 4317;
  const baseUrl = `http://127.0.0.1:${port}`;
  let serverLog = "";
  const server = spawn(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: process.cwd(), env, stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });

  try {
    const ready = await waitForServer(`${baseUrl}/api/health`);
    result("production server starts", ready, ready ? baseUrl : "server did not become ready");
    if (!ready) {
      if (serverLog.trim()) console.log(serverLog.trim());
      return;
    }

    const routes = [
      "/",
      "/today",
      "/people-supported",
      "/quality-governance",
      "/operations",
      "/workforce",
      "/finance",
      "/evidence-reports",
      "/actions",
      "/integration-health",
      "/people-supported/clients/RH-014",
      "/sign-in",
    ];

    let routeFailures = 0;
    for (const route of routes) {
      const response = await fetch(`${baseUrl}${route}`);
      const body = await response.text();
      if (response.status !== 200 || !body.includes("Muve")) routeFailures += 1;
    }
    result("workspace routes respond", routeFailures === 0, `${routes.length - routeFailures}/${routes.length} routes healthy`);

    const healthResponse = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
    const health = await healthResponse.json();
    result(
      "health endpoint contract",
      healthResponse.status === 200 && health.status === "ok" && health.service === "muve-analytics-2",
      `${healthResponse.status} ${health.status ?? "invalid"}`,
    );

    const qualityResponse = await fetch(`${baseUrl}/quality-governance`);
    const qualityHtml = await qualityResponse.text();
    result(
      "CQC assurance route content",
      qualityResponse.status === 200 && qualityHtml.includes("Quality statement assurance") && qualityHtml.includes("not a predicted CQC rating"),
      `status ${qualityResponse.status}`,
    );

    const askResponse = await fetch(`${baseUrl}/api/ai/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "How did visit delivery change?" }),
    });
    const ask = await askResponse.json();
    result(
      "Ask Muve cited response",
      askResponse.status === 200 && typeof ask.answer === "string" && Array.isArray(ask.citations) && ask.citations.length > 0,
      `${askResponse.status} ${ask.mode ?? "invalid"}`,
    );
  } catch (error) {
    result("runtime route checks", false, error instanceof Error ? error.message : String(error));
    if (serverLog.trim()) console.log(serverLog.trim());
  } finally {
    server.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (!server.killed) server.kill("SIGKILL");
  }
}

console.log("Muve Analytics 2.0 validation");
console.log("================================");
commandCheck("lint", "npm", ["run", "lint"]);
commandCheck("typecheck", "npm", ["run", "typecheck"]);
commandCheck("unit tests", "npm", ["run", "test"]);
commandCheck("Python pipeline syntax", "python3", ["-m", "compileall", "-q", "pipeline"]);
commandCheck("Python pipeline contract", "python3", ["-m", "muve_pipeline.runner", "--dry-run"]);
commandCheck("production build", "npm", ["run", "build"]);

if (failures === 0) await validateRuntime();
else result("runtime checks", false, "skipped because a static check failed");

console.log("================================");
if (failures > 0) {
  console.log(`[SUMMARY] FAIL — ${failures} check(s) failed`);
  process.exit(1);
}
console.log("[SUMMARY] PASS — all validation checks passed");
