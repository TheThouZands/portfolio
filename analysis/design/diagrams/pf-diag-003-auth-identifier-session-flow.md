# PF-DIAG-003 - Auth Identifier And Session Flow

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-30  
Target home: FigJam and Confluence

## Purpose

Show how the portfolio-specific identifier flow relates to Better Auth session behavior and the planned role
authorization boundary.

Source docs:

- `src/auth/auth.md`
- `analysis/technical/adr/0004-separate-portfolio-identity-from-auth-provider-records.md`
- `analysis/technical/adr/0010-use-explicit-owner-allowlist-for-protected-tools.md`
- `analysis/product/interaction-policy.md`
- `analysis/product/auth-account-roadmap.md`
- `analysis/jira/user-stories.md`
- `KAN-56`

## Mermaid Source

```mermaid
flowchart TD
  A["Reader opens auth flow"] --> B["Enter username or email"]
  B --> C["Validate identifier shape"]
  C --> D["Apply auth rate limit"]
  D --> E{"Identifier kind"}

  E -->|"Username"| F["Normalize username"]
  F --> G{"Portfolio identity exists?"}
  G -->|"Yes"| H["Route to sign in"]
  G -->|"No"| I["Route to sign up"]

  E -->|"Email"| J["Normalize email"]
  J --> K["Route without exposing account existence"]
  K --> L["Future email verification or OTP decision"]

  H --> M["Validate password"]
  I --> N["Create portfolio identity"]
  M --> O["Better Auth creates session"]
  N --> O

  O --> P["Session cookie"]
  P --> Q["Local auth state refresh"]
  Q --> R["Authenticated reader UI"]
  R --> S["Can comment on blog posts"]
  R --> T{"Role model available?"}
  T -->|"No"| U{"Matches owner allowlist?"}
  U -->|"No"| V["Reader-only permissions"]
  U -->|"Yes"| W["Owner tool guard passes"]
  W --> X["Future moderation/CMS tools"]
  T -->|"Planned"| Y["Resolve server role"]
  Y --> Z{"Role"}
  Z -->|"Reader"| V
  Z -->|"Moderator"| AA["Moderation guard passes"]
  Z -->|"Owner"| W
  AA --> AB["Future moderation tools"]
  W --> AC["Future CMS authoring tools"]
```

## FigJam Notes

- Use separate colors for portfolio-owned identity decisions and Better Auth-owned session behavior.
- Mark email OTP as future/decision territory.
- Link rate limiting to security requirements `NFR-003` and `NFR-004`.
- Link owner-only path to ADR 0010, `FR-020`, and `PF-409`.
- Link planned Reader/Moderator/Owner role vocabulary to `PF-412`, `KAN-56`, and `PF-DIAG-008`.
- Client UI state can show affordances, but server role checks remain authoritative.

## Update Trigger

Update when identifier routing, signup/signin actions, Better Auth configuration, session refresh behavior, or owner
authorization changes.
