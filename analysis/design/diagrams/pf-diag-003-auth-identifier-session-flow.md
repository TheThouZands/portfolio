# PF-DIAG-003 - Auth Identifier And Session Flow

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show how the portfolio-specific identifier flow relates to Better Auth session behavior.

Source docs:

- `src/auth/auth.md`
- `analysis/technical/adr/0004-separate-portfolio-identity-from-auth-provider-records.md`
- `analysis/product/interaction-policy.md`
- `analysis/jira/user-stories.md`

## Mermaid Source

```mermaid
flowchart TD
  A["Reader opens auth flow"] --> B["Enter username or email"]
  B --> C["Validate identifier shape"]
  C --> D["Apply auth rate limit"]
  D --> E{"Identifier kind"}

  E -->|Username| F["Normalize username"]
  F --> G{"Portfolio identity exists?"}
  G -->|Yes| H["Route to sign in"]
  G -->|No| I["Route to sign up"]

  E -->|Email| J["Normalize email"]
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
```

## FigJam Notes

- Use separate colors for portfolio-owned identity decisions and Better Auth-owned session behavior.
- Mark email OTP as future/decision territory.
- Link rate limiting to security requirements `NFR-003` and `NFR-004`.

## Update Trigger

Update when identifier routing, signup/signin actions, Better Auth configuration, or session refresh behavior changes.

