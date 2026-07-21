# E4.3 Evidence

**Verdict: PASS**

**Story (verbatim):** As a QL, I want an evidence register (scope, category, owner, date, source, review date, mapped statements).

**Persona:** a QL  
**Route exercised:** /quality-governance  
**Browser:** Playwright Chromium (Google Chrome channel), real fixture login  
**Scope denial:** /api/clients/OUT-OF-SCOPE returned 404 before permission detail  
**Accessibility:** axe scan completed; zero serious or critical violations.  
**Data:** anonymised fixture records only; watermark and definition version asserted.

## Acceptance criteria → browser proof

| Acceptance criterion | Browser assertion | Screenshot |
|---|---|---|
| AC 1: files via short-lived Vercel Blob links. | Visible acceptance text asserted as a QL; policy and lineage footer present | 01-files-via-short-lived-vercel-blob-links.png |
| AC 2: every download audited. | Visible acceptance text asserted as a QL; policy and lineage footer present | 02-every-download-audited.png |
| AC 3: superseded evidence stays traceable. | Visible acceptance text asserted as a QL; policy and lineage footer present | 03-superseded-evidence-stays-traceable.png |
| AC 4: The surface states scope, source freshness, coverage and definition version; missing coverage is Unknown. | Visible acceptance text asserted as a QL; policy and lineage footer present | 04-the-surface-states-scope-source-freshness-co.png |
| AC 5: A cross-scope client request is denied with a not-found response before permission details are disclosed. | Visible acceptance text asserted as a QL; policy and lineage footer present | 05-a-cross-scope-client-request-is-denied-with-.png |
| AC 6: Material reads, changes, approvals or exports use the append-only audit contract. | Visible acceptance text asserted as a QL; policy and lineage footer present | 06-material-reads-changes-approvals-or-exports-.png |

A Playwright walkthrough trace is attached as `trace.zip`. Every factual AI claim is required to carry a citation; the explicit non-answer is used when evidence is insufficient.
