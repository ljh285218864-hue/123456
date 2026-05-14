# ShareMall 共享商城

ShareMall is a curated storefront marketplace scaffold built for the agreed MVP rules:

- English customer storefront and checkout experience.
- Chinese administrator dashboard.
- Invitation-code registration model.
- Recommended 10-store activation flow.
- Bronze trial activation after purchasing one $59 product from each recommended storefront.
- Valid invitation and member level model.
- $20 commission ledger with unsettled/settled states.
- PayPal-first checkout plan.
- Manual shipment export and settlement workflow.
- Official seed storefront management in the admin panel.

## Tech stack

- Next.js App Router
- TypeScript
- Prisma schema for PostgreSQL
- PayPal integration placeholders
- CSS modules via global CSS

## Local setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` before connecting a real database or PayPal account.

## Important folders

```text
app/                 Next.js pages
app/admin/           Chinese admin dashboard pages
lib/                 Business rule helpers
prisma/schema.prisma Database model draft
docs/                Product requirements and implementation notes
```

## Current status

This commit is the first MVP scaffold. It contains product logic, admin page structure, data models, and placeholder UI. Real database persistence, PayPal webhooks, authentication, file upload, and scheduled commission jobs still need implementation.
