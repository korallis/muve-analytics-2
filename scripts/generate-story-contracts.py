#!/usr/bin/env python3
"""Generate the checked-in delivery contract from the canonical plan."""
from __future__ import annotations

import json
import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
PLAN = Path("/Users/leebarry/fusion-harness/plan.md")
OUTPUT = REPO / "src/lib/delivery/story-contracts.json"

PHASE_TWO = {
    "E2.1", "E2.2", "E2.3", "E2.4", "E3.1", "E3.2", "E3.3",
    "E4.1", "E4.2", "E4.3", "E4.4", "E5.1", "E5.2", "E5.3", "E5.4", "E5.5",
    "E8.1", "E8.2", "E8.3", "E8.4", "E9.1", "E9.2", "E9.3",
}
PHASE_THREE = {
    "E4.5", "E4.6", "E4.7", "E4.8", "E5.6", "E5.7", "E5.8", "E5.9",
    "E6.1", "E6.2", "E6.3", "E6.4", "E6.5",
    "E7.1", "E7.2", "E7.3", "E7.4", "E7.5",
}
PHASE_FOUR = {"E5.10", "E8.5", "E8.6", "E8.7", "E8.8", "E9.4", "E10.3"}

ROUTES = {
    "E1": "/integration-health",
    "E2": "/metric-glossary",
    "E3": "/security-audit",
    "E4": "/quality-governance",
    "E5": "/people-supported/clients/RH-014",
    "E6": "/workforce",
    "E7": "/finance",
    "E8": "/ai-governance",
    "E9": "/actions",
    "E10": "/delivery-readiness",
}


def phase_for(story_id: str) -> int:
    if story_id == "E3.4":
        return 0
    if story_id.startswith("E1.") or story_id in {"E10.1", "E10.2"}:
        return 1
    if story_id in PHASE_TWO:
        return 2
    if story_id in PHASE_THREE:
        return 3
    if story_id in PHASE_FOUR:
        return 4
    return 5


def route_for(story_id: str) -> str:
    if story_id in {"E5.4", "E5.5", "E5.9"}:
        return "/operations"
    return ROUTES[story_id.split(".")[0]]


def clean(markdown: str) -> str:
    value = re.sub(r"\*\*|\*", "", markdown)
    return re.sub(r"\s+", " ", value).strip()


def derive_criteria(story: str, explicit: str | None) -> list[str]:
    if explicit:
        criteria = [part.strip(" .") + "." for part in explicit.split(";") if part.strip()]
    else:
        outcome = story.split(", so ", 1)[-1].rstrip(".")
        criteria = [f"The authorised persona can complete the stated outcome: {outcome}."]
    criteria.extend([
        "The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown.",
        "A cross-scope client request is denied with a not-found response before permission details are disclosed.",
        "Material reads, changes, approvals or exports use the append-only audit contract.",
    ])
    return list(dict.fromkeys(criteria))


def main() -> None:
    stories = []
    pattern = re.compile(r"^- \*\*(E\d+\.\d+) \[(P\d)\]\*\* (.+)$")
    for line in PLAN.read_text().splitlines():
        match = pattern.match(line)
        if not match:
            continue
        story_id, priority, remainder = match.groups()
        explicit_match = re.search(r"\*AC:\s*(.*?)\*$", remainder)
        explicit = clean(explicit_match.group(1)) if explicit_match else None
        story_markdown = remainder[: explicit_match.start()].strip() if explicit_match else remainder
        story = clean(story_markdown)
        persona = story.split(",", 1)[0].removeprefix("As ").strip()
        stories.append({
            "id": story_id,
            "priority": priority,
            "phase": phase_for(story_id),
            "epic": story_id.split(".")[0],
            "persona": persona,
            "story": story,
            "criteria": derive_criteria(story, explicit),
            "route": route_for(story_id),
        })
    if len(stories) != 57:
        raise SystemExit(f"Expected 57 stories, found {len(stories)}")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(stories, indent=2, ensure_ascii=False) + "\n")
    print(f"[PASS] wrote {len(stories)} story contracts to {OUTPUT}")


if __name__ == "__main__":
    main()
