#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

REPO = Path(__file__).resolve().parents[1]
STORIES = json.loads((REPO / "src/lib/delivery/story-contracts.json").read_text())


def run(args: list[str], env: dict[str, str] | None = None, timeout: int = 900) -> None:
    completed = subprocess.run(args, cwd=REPO, env=env, text=True, timeout=timeout)
    if completed.returncode:
        raise SystemExit(completed.returncode)


def wait_for_server(url: str) -> None:
    for _ in range(100):
        try:
            with urlopen(url, timeout=2) as response:
                if response.status == 200:
                    return
        except Exception:  # noqa: BLE001
            time.sleep(0.2)
    raise RuntimeError(f"Server did not start at {url}")


def main() -> None:
    print("[CHECK] uninterrupted static/build/runtime preflight", flush=True)
    run(["npm", "run", "validate"])

    port = 6217
    base_url = f"http://127.0.0.1:{port}"
    server_env = {**os.environ, "AUTH_REQUIRED": "true", "MUVE_SESSION_TOKEN": "full-suite-session", "NEXT_TELEMETRY_DISABLED": "1"}
    server = subprocess.Popen(
        ["npm", "run", "dev", "--", "--hostname", "127.0.0.1", "--port", str(port)],
        cwd=REPO,
        env=server_env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        wait_for_server(f"{base_url}/api/health")
        gate_env = {**os.environ, "MUVE_GATE_SKIP_STATIC": "1", "STORY_BROWSER_BASE_URL": base_url, "NEXT_TELEMETRY_DISABLED": "1"}
        for story in STORIES:
            story_id = story["id"]
            print(f"[CHECK] story gate {story_id}", flush=True)
            run([sys.executable, f"delivery/gates/{story_id}.py"], env=gate_env, timeout=420)

        with tempfile.TemporaryDirectory(prefix="muve-phase-suite-") as phase_evidence:
            phase_env = {**gate_env, "PHASE_EVIDENCE_ROOT": phase_evidence}
            print("[CHECK] six phase-exit browser journeys", flush=True)
            run(["node", "scripts/capture-phase-evidence.mjs"], env=phase_env, timeout=600)
        print("[SUMMARY] PASS — all 57 story gates and six phase journeys green", flush=True)
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()


if __name__ == "__main__":
    main()
