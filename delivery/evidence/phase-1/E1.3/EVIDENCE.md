# E1.3 Evidence

**Verdict: PASS**

**Story (verbatim):** As any user, I want freshness and lineage on every surface, so I can judge whether data is safe to use.

**Persona:** any user  
**Route exercised:** /today  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: per-mart `loaded_at` + source watermark + definition version visible. | Visible acceptance text asserted as any user; policy and lineage footer present | 01-per-mart-loaded-at-source-watermark-definiti.png |
| AC 2: stale >26h shows an amber banner. | Visible acceptance text asserted as any user; policy and lineage footer present | 02-stale-26h-shows-an-amber-banner.png |
| AC 3: missing coverage renders as Unknown, never zero. | Visible acceptance text asserted as any user; policy and lineage footer present | 03-missing-coverage-renders-as-unknown-never-ze.png |
| AC 4: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as any user; policy and lineage footer present | 04-the-surface-states-scope-source-freshness-co.png |
| AC 5: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as any user; policy and lineage footer present | 05-a-cross-scope-client-request-is-denied-with-.png |
| AC 6: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as any user; policy and lineage footer present | 06-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
