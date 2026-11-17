# ConvergenceIQ

An English/Spanish dashboard prototype for exploring investing, entrepreneurship and job-market signals, with adjustable scoring, scenario views, portfolio alignment and watchlist interfaces.

## Purpose and status

The dashboard renders curated datasets and client-side calculation rules. It is not established as a live market feed or a validated forecasting system. Portfolio prices and many signal/watchlist values are defined in source; scenario outputs use programmed sensitivities rather than a trained predictive model.

Five API routes exist for optional external data access, but the inspected dashboard components import local datasets rather than fetching those routes. Setting provider keys alone does not connect those responses to the visible dashboard. Some fallback series contain generated/random values and fallback news/regulatory examples are hard-coded; their labels and timestamps must not be mistaken for verified reports.

Reviewed November 17, 2026 against `main` at `02b89b4feb729c77d16f325f7c6ac36a0f831115`. This review describes the tracked source, not verified production behavior. Current hosting, commercial readiness and the next owner-approved milestone remain unverified.

## Repository map

| Path | Responsibility |
|---|---|
| [src/app/page.tsx](src/app/page.tsx) and [src/components/dashboard/](src/components/dashboard/) | Dashboard entry, domain views, controls, portfolio and watchlist UI |
| [src/components/charts/](src/components/charts/) | Recharts visualizations |
| [src/components/ui/](src/components/ui/) | Shared UI primitives |
| [src/lib/data/curated-datasets.ts](src/lib/data/curated-datasets.ts) | Local signal datasets, presets and scenario inputs |
| [src/lib/scoring-engine.ts](src/lib/scoring-engine.ts) | Weighted scores and scenario rules |
| [src/lib/portfolio-engine.ts](src/lib/portfolio-engine.ts) | Local ticker reference data, valuation and alignment logic |
| [src/lib/watchlist-engine.ts](src/lib/watchlist-engine.ts) | Watchlist reference data and derived alerts |
| [src/lib/store.ts](src/lib/store.ts), [src/lib/watchlist-store.ts](src/lib/watchlist-store.ts) | In-memory Zustand dashboard/watchlist state |
| [src/lib/i18n/](src/lib/i18n/) | English/Spanish UI and data-label translations |
| [src/app/api/](src/app/api/) | Alpha Vantage, BLS, FRED, GNews and SEC route handlers |

## Architecture and integrations

Next.js 16 App Router, React 19 and TypeScript host the dashboard and API routes. Tailwind CSS 4, Base UI/shadcn-style components, Lucide and Recharts provide the interface. Zustand manages dashboard state; language and theme preferences are persisted in browser storage, while dashboard/filter/alert-status stores do not implement durable account synchronization. No application authentication, database or brokerage integration is tracked.

| Route | Optional external source | Configuration / behavior |
|---|---|---|
| `/api/alpha-vantage` | Alpha Vantage | `ALPHA_VANTAGE_API_KEY`; fallback data without a key or on handled errors |
| `/api/bls` | BLS | `BLS_API_KEY`; generated fallback without a key or on handled errors |
| `/api/fred` | FRED | `FRED_API_KEY`; generated fallback without a key or on handled errors |
| `/api/news` | GNews | `GNEWS_API_KEY`; example news and simple sentiment rules as fallback |
| `/api/sec` | SEC search | Attempts an external request without an API key; falls back on handled errors |

These routes are not scheduled ingestion jobs. Cache hints and a `source: "live"` response field are implementation details, not a guarantee of freshness, correctness or successful provider validation. Do not invoke routes during documentation-only work.

## Setup and environments

For future authorized development, use compatible Node.js/npm, `npm ci`, then `npm run dev` at [localhost:3000](http://localhost:3000). The manifest pins Next.js but no root Node-version file or `engines` field is tracked. No `.env.example` is provided.

The curated dashboard can be inspected without provider keys. If external API development is separately authorized, obtain appropriately scoped development credentials through provider secret stores and place only the four names above in ignored `.env.local`; never commit their values or prefix them with `NEXT_PUBLIC_`. Calling the SEC route can use network resources even with no credentials. No Neon project or database setup is required by this tree. Canonical domain and production/preview mappings are unverified.

## Safe commands

For documentation work, inspect the repository without starting the application:

```sh
git status --short --branch
git ls-tree -r --name-only HEAD
git diff --check
git diff -- README.md
git diff --cached --name-only
```

Use an isolated documentation branch and stage only `README.md`. The package commands described elsewhere are for separately authorized development; none needs to run for a README edit. Preserve existing work and do not run installs, builds, tests, provider requests or deployment commands during documentation maintenance.

## Testing and validation

[package.json](package.json) defines `dev`, `build` (`next build`), `start` (`next start`) and `lint` (`eslint`). No tracked automated tests, standalone typecheck script or CI workflow is present. Future validation should distinguish deterministic scoring from generated fallback data and verify provider errors, data provenance, bilingual labels and state persistence separately.

This README pass checked document structure, relative links, original-link preservation and README-only diffs. No application tests, lint, type checks, builds, browser flows or live services were run.

## Deployment and rollback

The tracked configuration is a default Next.js application with server API routes, not a static-export configuration. No hosting-specific deployment file or tested recovery runbook is tracked. A future approved release must preserve its previous deployment and environment settings; a code rollback does not reverse external API usage or restore browser state. The starter's Vercel references are general framework resources, not evidence of an active deployment.

README changes can still trigger hosting automation when pushed. Keep this documentation branch local until publication is approved with a confirmed no-deployment path. No settings, deployments, merges or databases are changed by this documentation pass. For a documentation rollback, propose a reviewed revert of the README commit.

## Risks and guardrails

- Do not represent generated fallback data, sample headlines, static ticker prices or programmed scenario rules as current financial/regulatory facts or validated advice.
- Public API handlers can consume provider quotas. Their authorization, rate limiting, request validation and error handling need a separate review before live use; this README change does not change those controls.
- Keep credentials, private holdings and personal financial information out of this public repository and documentation. Use fictional values in examples.
- The dashboard has no implemented trade execution or account-linked portfolio synchronization. Do not infer either from valuation or alignment UI.

## Related documentation

- [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md): read before code changes; no tracked `.agents/skills` directory is present.
- [Types](src/types/), [dataset definitions](src/lib/data/curated-datasets.ts), [API source](src/app/api/) and [package scripts](package.json) describe the implemented boundaries.

This project was bootstrapped with `create-next-app`; the manifest still uses the generic package name `dashboard`. No separate project runbook or root license file is tracked. Original framework references follow.

### Framework references retained from the starter

The original framework links are preserved for background; generic starter instructions do not establish this project's deployed behavior.

- [Next.js](https://nextjs.org)
- [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- [http://localhost:3000](http://localhost:3000)
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Geist](https://vercel.com/font)
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [the Next.js GitHub repository](https://github.com/vercel/next.js)
- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
