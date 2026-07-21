# AXI browser validation — Muve Analytics 2.0 plan implementation

**Driver:** `chrome-devtools-axi` controlling a real Chrome session

**Local origin:** `http://127.0.0.1:4318`

**Production origin:** `https://muve-analytics-2.vercel.app`

**Production deployment:** Vercel alias retested after the final AI Gateway deployment

## Browser journeys completed

1. **Command Centre / Today** — AXI loaded `/today` at desktop width and found the “Good morning, Lee” level-one heading, priority worklist, five-key-question assurance, Action Centre link and Ask Muve form. Raw snapshots: `axi-implementation-local-today.txt` and `axi-implementation-production-today.txt`.
2. **Ask Muve through Vercel AI Gateway** — AXI clicked **Run cited investigation** in production and waited for the live response. The result reported mode `ai-gateway`, cited `Metric comparison · mart_visit_exceptions · 1.1.0`, stated scope and data time, and returned the approved visit-delivery comparison. Raw interaction: `axi-implementation-production-ask-click.txt` and `axi-implementation-production-ask-result.txt`.
3. **Client 360** — AXI loaded `/people-supported/clients/RH-014` locally and in production. The accessibility snapshot contains the unified timeline and Visit, Medication, Observation and Safeguarding records with source identifiers. Raw snapshots: `axi-implementation-client-360.txt` and `axi-implementation-production-client-360.txt`.
4. **Action Centre** — AXI loaded `/actions`, located action `ACT-206`, clicked **Start action**, and confirmed the control changed to **Request sign-off**. This proves the owner/due-date action lifecycle is operable in the browser. Raw snapshots: `axi-implementation-action-click.txt`, `axi-implementation-action-result.txt`, `axi-implementation-production-action-click.txt` and `axi-implementation-production-action-result.txt`.
5. **Integration health and lineage** — AXI loaded `/integration-health` locally and in production. The snapshots include Birdie Snowflake, Neon marts, Xero, Spendesk and Vercel AI Gateway with status, loaded time and watermark evidence. Raw snapshots: `axi-implementation-integrations.txt` and `axi-implementation-production-integrations.txt`.
6. **Workforce and Finance** — AXI exercised the existing workforce workspace and the final production Finance workspace. Finance exposes Xero package margin, Spendesk allocation and credit-control exceptions. Raw evidence: `axi-implementation-finance.txt` and `axi-implementation-production-finance.txt`; workforce remains covered by the original complete workspace run retained in this directory.
7. **Responsive accessibility** — AXI resized Chrome to 390×844 and loaded `/today`. The mobile accessibility tree retained the labelled “Mobile primary” navigation and all command-centre content. Raw snapshots: `axi-implementation-mobile-today.txt` and `axi-implementation-production-mobile-today.txt`.
8. **Runtime quality** — AXI console inspection returned `<no console messages found>` after the complete production journey. Network inspection found no HTTP 4xx/5xx document, API or asset requests. Evidence: `axi-implementation-production-console.txt` and `axi-implementation-production-network.txt`.

## Findings

- **PASS:** Command Centre, Client 360, Action Centre, integration health, Workforce and Xero Finance surfaces render through the real browser accessibility tree.
- **PASS:** Ask Muve makes a production AI Gateway request and renders a metric-registry citation, scope and data timestamp.
- **PASS:** The action workflow changes state only after a user click.
- **PASS:** Mobile navigation and content remain accessible at 390×844.
- **PASS:** Production console and network inspection found no blocking issue.
- **PASS:** Demonstration records use coded identifiers and are explicitly labelled as containing no personal data.
