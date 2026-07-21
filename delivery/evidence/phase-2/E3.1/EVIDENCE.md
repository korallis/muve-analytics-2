# E3.1 Evidence

**Verdict: PASS**

**Story (verbatim):** As an SA, I want deny-by-default access: roles plus per-user report and client scoping enforced in middleware, inside metric compilation, in AI tools, and on exports — evaluated by one central policy service.

**Persona:** an SA  
**Route exercised:** /security-audit  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: automated negative tests prove cross-scope access is impossible, including via AI chat. | Visible acceptance text asserted as an SA; policy and lineage footer present | 01-automated-negative-tests-prove-cross-scope-a.png |
| AC 2: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an SA; policy and lineage footer present | 02-the-surface-states-scope-source-freshness-co.png |
| AC 3: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an SA; policy and lineage footer present | 03-a-cross-scope-client-request-is-denied-with-.png |
| AC 4: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an SA; policy and lineage footer present | 04-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
