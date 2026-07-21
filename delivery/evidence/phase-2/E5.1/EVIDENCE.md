# E5.1 Evidence

**Verdict: PASS**

**Story (verbatim):** As an RM, I want a per-client unified timeline (incidents, safeguarding, RPI, authorisation events, observations, risk-level changes, medication events), so I see the whole person.

**Persona:** an RM  
**Route exercised:** /people-supported/clients/RH-014  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: client-level permission checked on every load and export. | Visible acceptance text asserted as an RM; policy and lineage footer present | 01-client-level-permission-checked-on-every-loa.png |
| AC 2: source and freshness visible per section. | Visible acceptance text asserted as an RM; policy and lineage footer present | 02-source-and-freshness-visible-per-section.png |
| AC 3: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as an RM; policy and lineage footer present | 03-the-surface-states-scope-source-freshness-co.png |
| AC 4: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as an RM; policy and lineage footer present | 04-a-cross-scope-client-request-is-denied-with-.png |
| AC 5: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as an RM; policy and lineage footer present | 05-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
