# AXI browser validation — Muve Analytics 2.0 Phase 0

**Driver:** `chrome-devtools-axi` controlling real headless Chrome  
**Session:** `muve-analytics2-phase0`  
**Candidate:** local production build created by `npm run build`  
**Loaded origin:** `http://127.0.0.1:4318`  
**Primary loaded URL:** `http://127.0.0.1:4318/today`

## Journeys executed

1. AXI opened `http://127.0.0.1:4318/today` at desktop size 1440×1000 and captured the complete accessibility snapshot in `axi-today-open.txt`. The snapshot exposed a single level-one heading, labelled Primary navigation, Today summary region, Priority worklist region, Ask Muve region, labelled review controls and all seven workspace links.
2. AXI clicked the real **Open quality statement matrix** link by accessibility reference and confirmed navigation to `http://127.0.0.1:4318/quality-governance`. The post-click snapshot in `axi-quality-snapshot.txt` confirmed all 34 CQC statements, the correct 8/6/5/7/8 distribution, six evidence categories and the explicit “not a predicted CQC rating” warning.
3. AXI opened every remaining route in the same browser session: `/people-supported`, `/operations`, `/workforce`, `/finance` and `/evidence-reports`. The resulting browser accessibility snapshots are in `axi-all-workspaces.txt`; each loaded with the expected heading, summary regions, exception list and assurance-cycle content.
4. AXI emulated a 390×844 mobile touch viewport at device scale factor 3, reopened `/today`, and captured the complete mobile accessibility snapshot in `axi-today-mobile-open.txt`. The desktop sidebar was replaced by the labelled Mobile primary navigation, content retained logical heading order and no control disappeared from the accessibility tree.
5. AXI keyboard testing pressed Tab from page load. Focus landed on **Skip to main content**. Pressing Enter changed the URL to `#main-content` and focused the main landmark. Raw focus evidence is in `axi-keyboard-focus.txt` and `axi-keyboard-result.txt`.
6. AXI console inspection returned `<no console messages found>` (`axi-console.txt`). AXI network inspection showed successful 200/304 responses for the document, Next.js assets and prefetched workspace routes (`axi-network.txt`).
7. AXI opened `http://127.0.0.1:4318/api/health`; the browser snapshot in `axi-health-snapshot.txt` contains `status: ok`, `service: muve-analytics-2`, `phase: phase-0`, and passing runtime/routing checks.

## Findings

- **PASS:** Desktop and mobile page structure is available through the browser accessibility tree.
- **PASS:** Workspace navigation functions through a real link interaction.
- **PASS:** Skip-link keyboard journey moves focus to the main landmark.
- **PASS:** Every planned Phase-0 workspace and the health endpoint loads in Chrome.
- **PASS:** No browser console errors were emitted.
- **PASS:** No failed document, asset or workspace request was found in the inspected network log.
- **PASS:** Demonstration content is visibly labelled and contains no real personal data.

No blocking browser issue was found. Raw AXI outputs are retained beside this report so another agent can reproduce and inspect individual snapshots rather than relying on this summary.
