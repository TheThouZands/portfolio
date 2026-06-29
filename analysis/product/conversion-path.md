# Conversion Path Brief

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

The portfolio currently proves technical capability, but it does not yet define a clear business conversion path. This
brief turns the positioning hypothesis into a practical visitor journey and planned requirements.

## Conversion Goal

Convert a qualified visitor into a scoped conversation about one of the portfolio's service wedges:

- Fullstack product systems.
- CMS and structured content architecture.
- Authenticated interaction workflows.
- Database and deployment workflows.
- Product analysis and technical planning.

The intended first conversion is a discovery/build slice, not a vague "contact me sometime" action.

The service offer catalog in `analysis/product/service-offer-catalog.md` defines the offer labels, buyer fit, outputs,
and intake routing rules that this conversion path should use.

## Primary Journey

| Step | Visitor question | Product answer |
| --- | --- | --- |
| 1. Arrival | Who is this and what do they build? | Hero, intro, and values communicate fullstack systems and durable tools. |
| 2. Capability scan | Does this match my problem? | Skills, service positioning, and featured projects map capability to proof. |
| 3. Proof review | Can they actually build it? | Project details, experience, blog posts, architecture docs, and ADRs. |
| 4. Trust check | Will the work be maintainable? | Requirements, migrations, tests, traceability, and planning artifacts. |
| 5. Action | What should I ask for first? | Scoped discovery/build offer with clear next-step options. |

## Proposed Entry Offers

| Offer | Best for | Starting output |
| --- | --- | --- |
| Product system audit | A visitor with an existing app or idea that feels unclear. | Analysis memo, risk map, and delivery slice backlog. |
| CMS/content model design slice | A visitor with content that is outgrowing static pages. | Content model, migration plan, and rendering approach. |
| Auth/interaction workflow slice | A visitor who needs accounts, comments, submissions, or protected workflows. | Flow diagram, data model, validation/rate-limit plan. |
| Database/deployment workflow setup | A visitor with risky schema/deployment practices. | Migration workflow, preview database strategy, and operational checklist. |
| Fullstack feature delivery sprint | A visitor with a scoped feature to build. | Jira-ready stories, implementation PRs, and verification notes. |

## Page Implications

| Surface | Needed change |
| --- | --- |
| Homepage | Add service-oriented copy that explains the first action a visitor can take. |
| Projects | Make project cards and details show problem, approach, and result. |
| Blog | Use posts to explain decisions and link back to service wedges. |
| Experience | Show capability and scope, not only chronology. |
| Contact/action surface | Add a focused next-step path with service wedge selection. |

## Call-To-Action Options

| CTA | When to use | Risk |
| --- | --- | --- |
| "Start a discovery/build slice" | Best default for service positioning. | Needs supporting copy to avoid sounding abstract. |
| "Request a product system audit" | Good for analysis-first leads. | May sound too consultative if implementation proof is hidden. |
| "Plan a fullstack feature" | Good for implementation leads. | Could invite vague feature requests without intake structure. |
| "Discuss CMS/content architecture" | Good for content-heavy leads. | Narrower than the full portfolio positioning. |

Recommended default: "Start a discovery/build slice."

## Intake Questions

The first contact/intake experience should collect enough context to qualify the conversation without becoming a long
form.

| Question | Why it matters |
| --- | --- |
| What kind of system or workflow are you trying to build or improve? | Routes the lead to the right service wedge. |
| What already exists? | Separates greenfield planning from improvement work. |
| What is the riskiest part right now? | Reveals whether the need is product clarity, data, auth, deployment, or UI. |
| What outcome would make a first slice successful? | Keeps scope small and measurable. |
| How should I contact you? | Enables follow-up. |

## Requirements Impact

| Requirement | Status |
| --- | --- |
| `FR-017` visitors can choose a scoped service entry point | Planned. |
| `FR-021` visitors can understand service offers, fit, outputs, and scope boundaries | Planned. |
| `NFR-012` conversion paths should keep claims tied to evidence | Planned. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-701` | Define service entry points and CTA copy. |
| `PF-702` | Add contact/intake route or component. |
| `PF-703` | Link projects and posts to service wedges. |
| `PF-704` | Create visitor journey diagram in FigJam. |
| `PF-705` | Maintain the service offer catalog as the source for offer labels, outputs, and scope boundaries. |

## Measurement

Because the product is still personal and early, measurement can stay lightweight:

- Does the visitor reach a service-specific action from homepage, project, or post?
- Does the intake response name a concrete problem?
- Can the owner map the request to one service wedge?
- Can the first follow-up become a small Jira-ready delivery slice?

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should the first contact action be a form, mail link, calendar link, or GitHub/LinkedIn path? | Start with the smallest reliable contact path. |
| Should each service wedge have its own page? | Not yet; begin with one conversion path and link proof content. |
| Should comments contribute to conversion? | Only indirectly as proof of interaction capability. |
| Should pricing be public? | Defer until offer shapes are clearer. |
