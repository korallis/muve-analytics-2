# E9.2 Evidence

**Verdict: PASS**

**Story (verbatim):** As an RM, I want to convert any risk item, exception, gap, or AI recommendation into an assigned action with source, owner, priority, due date, and evidence link.

**Persona:** an RM  
**Route exercised:** /actions  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: completion of controlled action types requires evidence and reviewer sign-off. | Visible acceptance text asserted as an RM; policy and lineage footer present | 01-completion-of-controlled-action-types-requir.png |
| AC 2: full history retained. | Visible acceptance text asserted as an RM; policy and lineage footer present | 02-full-history-retained.png |
| AC 3: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an RM; policy and lineage footer present | 03-the-surface-states-scope-source-freshness-co.png |
| AC 4: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an RM; policy and lineage footer present | 04-a-cross-scope-client-request-is-denied-with-.png |
| AC 5: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an RM; policy and lineage footer present | 05-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
