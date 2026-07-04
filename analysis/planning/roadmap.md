# Roadmap

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira

## Planning Principle

The product should move from analysis baseline to forward delivery in small, checkable increments. Each slice should
produce artifacts that are useful locally first, then portable into Confluence, Jira, Figma/FigJam, or GitHub.

## Stage 0 - Product Baseline

Goal: define the product foundation before forward delivery.

| Slice | Output | Status |
| --- | --- | --- |
| S0.1 | Analysis index and artifact map | Baseline drafted |
| S0.2 | Problem statement, goals, stakeholders, and constraints | Baseline drafted |
| S0.3 | Functional and non-functional requirements | Baseline drafted |
| S0.4 | Jira-compatible user story backlog | Baseline drafted |
| S0.5 | Technical traceability, schema inventory, ADR seed, OpenAPI plan | Baseline drafted |

Exit check:

- Major implemented capabilities have requirement ids.
- Major implemented capabilities have at least one user story.
- Evidence commits and code areas are recorded.
- Next unknowns are visible instead of hidden.

## Stage 1 - Tool Setup

Goal: connect the artifact model to external planning tools without losing local source control.

| Slice | Output | Suggested target |
| --- | --- | --- |
| S1.1 | Confluence space/page tree plan | Confluence |
| S1.2 | Jira project setup map: epics, issue types, labels, components | Jira |
| S1.3 | Figma/FigJam diagram inventory and naming convention | Figma/FigJam |
| S1.4 | GitHub documentation placement rules | GitHub |

Current local outputs:

- `analysis/confluence/page-tree.md`
- `analysis/confluence/publishing-runbook.md`
- `analysis/jira/project-setup.md`
- `analysis/jira/import-history.md`
- `analysis/design/diagram-inventory.md`
- `analysis/design/figjam-creation-log.md`
- `analysis/github/documentation-rules.md`
- `analysis/planning/tool-setup-plan.md`
- `analysis/operations/release-and-review-cadence.md`
- `analysis/operations/decision-log.md`
- `analysis/operations/open-questions.md`

Exit check:

- Confluence page hierarchy mirrors `analysis/`.
- Jira epics and labels match backlog ids.
- FigJam diagrams have owners and source references.
- GitHub remains the source for ADRs, schema notes, and API contracts.
- External tool ids, URLs, and import mappings have local history files.
- Review cadence, decision log, and open questions register exist.

## Stage 2 - Product Clarification

Goal: decide where the portfolio should go next, not merely describe where it is.

Candidate slices:

- Stakeholder and persona analysis. Current local output: `analysis/product/stakeholders-and-personas.md`.
- Positioning brief for services sold through the portfolio. Current local output: `analysis/product/positioning-brief.md`.
- Service offer catalog for buyer fit, outputs, proof, and intake routing. Current local output: `analysis/product/service-offer-catalog.md`.
- Visitor journey from homepage to project proof to contact/action. Current local output: `analysis/product/conversion-path.md`.
- Content strategy for projects, experience, skills, and blog posts. Current local output: `analysis/product/content-strategy.md`.
- Comment interaction policy, moderation scope, and abuse handling. Current local output: `analysis/product/interaction-policy.md`.
- CMS authoring workflow. Current local output: `analysis/product/cms-authoring-workflow.md`.
- Auth/account roadmap: reader accounts, owner controls, client accounts, or private collaboration. Current local output: `analysis/product/auth-account-roadmap.md`.
- Product and delivery risk register. Current local output: `analysis/planning/risk-register.md`.
- Validation strategy. Current local output: `analysis/planning/validation-strategy.md`.

Exit check:

- Future work can be prioritized by business value.
- Each major feature has a reason to exist in the service portfolio.
- Risks have owners or explicit deferrals.
- Validation expectations are clear before implementation slices begin.

## Stage 3 - Design And Flow Diagrams

Goal: create diagrams that explain flows and architecture at the right level.

Candidate diagrams:

- Visitor discovery journey. Current local source: `analysis/design/diagrams/pf-diag-001-visitor-discovery-journey.md`.
- CMS content entity relationship diagram. Current local source: `analysis/design/diagrams/pf-diag-002-portfolio-content-model.md`.
- Auth identifier and session flow. Current local source: `analysis/design/diagrams/pf-diag-003-auth-identifier-session-flow.md`.
- Blog comment submission and rendering flow. Current local source: `analysis/design/diagrams/pf-diag-004-blog-comment-flow.md`.
- Deployment and Neon branch workflow. Current local source: `analysis/design/diagrams/pf-diag-005-deployment-neon-branch-workflow.md`.
- Structural content rendering contract. Current local source: `analysis/design/diagrams/pf-diag-006-structural-content-rendering-contract.md`.
- Documentation toolchain. Current local source: `analysis/design/diagrams/pf-diag-007-documentation-toolchain.md`.

Exit check:

- Diagrams are referenced from the relevant Markdown docs.
- Each diagram has a maintainer and update trigger.
- Diagrams separate product flow from technical architecture.

## Stage 4 - Forward Delivery

Goal: use the analysis baseline to plan new work.

Candidate epics:

- Portfolio positioning and conversion paths.
- CMS authoring workflow.
- Comment moderation and account trust.
- Public API contract, if a public API is justified.
- Observability and operational review.
- Accessibility and SEO hardening.

Exit check:

- Jira issues are small enough to implement and review independently.
- Each new implementation PR links to the relevant requirement/story/ADR.
- Analysis docs change when product decisions change.
