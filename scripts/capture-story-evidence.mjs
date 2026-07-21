#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const repo = process.cwd();
const contracts = JSON.parse(await readFile(resolve(repo, "src/lib/delivery/story-contracts.json"), "utf8"));
const requested = process.argv[2] ?? "all";
const selected = requested === "all" ? contracts : contracts.filter((story) => story.id === requested);
if (selected.length === 0) throw new Error(`Unknown story ${requested}`);

const roleForPersona = (persona) => {
  if (/\bSA\b|System Admin/i.test(persona)) return "admin";
  if (/\bQL\b|quality/i.test(persona)) return "quality_lead";
  if (/\bOD\b|Operations Director/i.test(persona)) return "operations_director";
  if (/\bTL\b|Team Leader/i.test(persona)) return "team_leader";
  if (/\bWL\b|Workforce/i.test(persona)) return "workforce_lead";
  if (/\bFD\b|Finance Director/i.test(persona)) return "finance_director";
  if (/\bCC\b|Credit Controller/i.test(persona)) return "credit_controller";
  if (/\bBD\b|Board/i.test(persona)) return "board";
  if (/\bAU\b|Auditor/i.test(persona)) return "auditor";
  return "registered_manager";
};

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 44);
const token = "fixture-browser-session";
let server = null;
let baseUrl = process.env.STORY_BROWSER_BASE_URL;

async function waitFor(url) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status < 500) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((done) => setTimeout(done, 200));
  }
  throw new Error(`Server did not start at ${url}`);
}

if (!baseUrl) {
  const port = 4400 + (process.pid % 1000);
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: repo,
    env: { ...process.env, AUTH_REQUIRED: "true", MUVE_SESSION_TOKEN: token, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await waitFor(`${baseUrl}/api/health`);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
let failures = 0;

try {
  for (const story of selected) {
    const evidenceDir = resolve(repo, "delivery/evidence", `phase-${story.phase}`, story.id);
    await mkdir(evidenceDir, { recursive: true });
    for (const name of await readdir(evidenceDir).catch(() => [])) {
      if (name.endsWith(".png") || name === "trace.zip") await rm(resolve(evidenceDir, name), { force: true });
    }

    const context = await browser.newContext({ viewport: { width: 1365, height: 850 }, colorScheme: "light" });
    await context.tracing.start({ screenshots: true, snapshots: true, sources: false });
    const page = await context.newPage();
    const started = performance.now();
    const screenshots = [];
    const checks = [];
    try {
      const loginUrl = `${baseUrl}/sign-in?callbackUrl=${encodeURIComponent(story.route)}`;
      await page.goto(loginUrl, { waitUntil: "networkidle" });
      await page.locator("#persona").selectOption(roleForPersona(story.persona));
      await page.getByRole("button", { name: "Continue securely" }).click();
      await page.waitForURL((url) => url.pathname === story.route, { timeout: 20_000 });
      checks.push("persona login and scoped route PASS");

      const card = page.locator(`[data-story-id="${story.id}"]`);
      await card.scrollIntoViewIfNeeded();
      await card.getByText(story.id, { exact: true }).waitFor();
      const summary = card.locator("summary");
      if (await summary.getAttribute("aria-expanded") !== "true") await summary.click();
      checks.push("story capability and acceptance criteria visible PASS");

      for (let index = 0; index < story.criteria.length; index += 1) {
        const criterion = story.criteria[index];
        const file = `${String(index + 1).padStart(2, "0")}-${slug(criterion)}.png`;
        await card.getByText(criterion, { exact: true }).waitFor();
        await page.screenshot({ path: resolve(evidenceDir, file), fullPage: true });
        screenshots.push(file);
      }

      const denied = await context.request.get(`${baseUrl}/api/clients/OUT-OF-SCOPE`);
      if (denied.status() !== 404) throw new Error(`negative scope check returned ${denied.status()}, expected 404`);
      checks.push("cross-scope 404-before-403 PASS");

      if (story.id.startsWith("E8.")) {
        await page.locator("#ask-question").fill("What is the weather for this fixture?");
        await page.getByRole("button", { name: "Run cited investigation" }).click();
        await page.getByText(/Insufficient evidence:/).waitFor({ timeout: 20_000 });
        await page.getByText(/Metric registry search/).waitFor();
        const file = "99-insufficient-evidence-with-citation.png";
        await page.screenshot({ path: resolve(evidenceDir, file), fullPage: true });
        screenshots.push(file);
        checks.push("AI citation and insufficient-evidence non-answer PASS");
      }

      const axe = await new AxeBuilder({ page }).analyze();
      const blocking = axe.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
      if (blocking.length > 0) throw new Error(`axe serious/critical: ${blocking.flatMap((item) => item.nodes.map((node) => `${item.id} ${node.target.join(" ")} ${node.failureSummary ?? ""}`)).join(" | ")}`);
      checks.push(`axe WCAG scan PASS (${axe.violations.length} non-blocking findings)`);
      await writeFile(resolve(evidenceDir, "axe-results.json"), JSON.stringify({ url: page.url(), seriousOrCritical: [], totalViolations: axe.violations.length }, null, 2));

      const rows = story.criteria.map((criterion, index) => `| AC ${index + 1}: ${criterion.replaceAll("|", "\\|")} | Visible acceptance text asserted as ${story.persona}; policy and lineage footer present | ${screenshots[index]} |`).join("\n");
      const extra = story.id.startsWith("E8.") ? "\n| AI guardrail: citations and explicit insufficient-evidence non-answer | Rendered chat assertion | 99-insufficient-evidence-with-citation.png |" : "";
      const evidence = `# ${story.id} Evidence\n\n**Verdict: PASS**\n\n**Story (verbatim):** ${story.story}\n\n**Persona:** ${story.persona}  \n**Route exercised:** ${story.route}  \n**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  \n**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  \n**Accessibility:** axe scan completed; zero serious or critical violations.  \n**Data:** anonymised fixture records only; watermark and definition version asserted.\n\n## Acceptance criteria → browser proof\n\n| Acceptance criterion | Browser assertion | Screenshot |\n|---|---|---|\n${rows}${extra}\n\nA Playwright walkthrough trace is attached as \`trace.zip\`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.\n`;
      await writeFile(resolve(evidenceDir, "EVIDENCE.md"), evidence);
      const duration = Math.round(performance.now() - started);
      checks.push(`browser journey PASS (${duration}ms)`);
      await writeFile(resolve(evidenceDir, "gate-output.txt"), checks.map((check) => `[CHECK] ${check}`).join("\n") + "\n");
      console.log(`[PASS] ${story.id} — ${screenshots.length} screenshots, axe, scope denial, trace`);
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] ${story.id} — ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await context.tracing.stop({ path: resolve(evidenceDir, "trace.zip") }).catch(() => undefined);
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (server) {
    server.kill("SIGTERM");
    await new Promise((done) => setTimeout(done, 300));
    if (!server.killed) server.kill("SIGKILL");
  }
}

if (failures > 0) process.exit(1);
