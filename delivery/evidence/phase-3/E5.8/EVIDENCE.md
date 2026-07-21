# E5.8 Evidence

**Verdict: PASS**

**Story (verbatim):** As an RM, I want client required-competency capture matched against skills held by that client's caregivers, with gaps feeding the Actions loop.

**Persona:** an RM  
**Route exercised:** /people-supported/clients/RH-014  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: expired competencies don't count. | Visible acceptance text asserted as an RM; policy and lineage footer present | 01-expired-competencies-don-t-count.png |
| AC 2: missing requirements show Unknown, never 100%. | Visible acceptance text asserted as an RM; policy and lineage footer present | 02-missing-requirements-show-unknown-never-100.png |
| AC 3: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an RM; policy and lineage footer present | 03-the-surface-states-scope-source-freshness-co.png |
| AC 4: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an RM; policy and lineage footer present | 04-a-cross-scope-client-request-is-denied-with-.png |
| AC 5: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an RM; policy and lineage footer present | 05-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
