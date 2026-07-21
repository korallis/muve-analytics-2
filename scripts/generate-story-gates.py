#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
CONTRACTS = json.loads((REPO / "src/lib/delivery/story-contracts.json").read_text())
GATES = REPO / "delivery/gates"


def main() -> None:
    GATES.mkdir(parents=True, exist_ok=True)
    for story in CONTRACTS:
        story_id = story["id"]
        content = f'''#!/usr/bin/env python3
from gate_common import run

if __name__ == "__main__":
    run("{story_id}")
'''
        (GATES / f"{story_id}.py").write_text(content)
    print(f"[PASS] wrote {len(CONTRACTS)} story gate wrappers")


if __name__ == "__main__":
    main()
