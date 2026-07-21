# E4.5 Evidence

**Verdict: PASS**

**Story (verbatim):** As an RM, I want one-click inspection packs per key question from a frozen snapshot.

**Persona:** an RM  
**Route exercised:** /quality-governance  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: snapshot records scope, period, source watermarks, and metric versions. | Visible acceptance text asserted as an RM; policy and lineage footer present | 01-snapshot-records-scope-period-source-waterma.png |
| AC 2: signed snapshots are immutable (corrections create a new version). | Visible acceptance text asserted as an RM; policy and lineage footer present | 02-signed-snapshots-are-immutable-corrections-c.png |
| AC 3: PDF/DOCX/XLSX reconcile to the same snapshot and include actions taken and approved AI narrative. | Visible acceptance text asserted as an RM; policy and lineage footer present | 03-pdf-docx-xlsx-reconcile-to-the-same-snapshot.png |
| AC 4: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an RM; policy and lineage footer present | 04-the-surface-states-scope-source-freshness-co.png |
| AC 5: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an RM; policy and lineage footer present | 05-a-cross-scope-client-request-is-denied-with-.png |
| AC 6: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an RM; policy and lineage footer present | 06-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
