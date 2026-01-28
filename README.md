# Employment Readiness & Placement Platform (ERPP)

ERPP is a dual-sided platform for non-profits in Canada to intake clients, compute a transparent readiness score, generate next-step plans, track placements, and export reports.

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth, DB, RLS)
- React Hook Form + Zod
- Recharts for charts
- pdf-lib for plan exports

## Local setup

### 1) Install dependencies
```bash
npm install
```

### 2) Environment variables
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3) Run locally
```bash
npm run dev
```

### 4) Apply migrations
```bash
supabase db reset
```
Or manually run the SQL in `supabase/migrations/0001_init.sql` against your Supabase project.

### 5) Seed demo data
```bash
npm run seed
```

## Demo mode
Demo mode is enabled by default in `src/lib/demo-data.ts`. In development, the app uses this seeded data to render dashboards and tables quickly without a database connection.

## Key workflows supported
1. Staff creates a program.
2. Staff creates a client or client completes intake.
3. System generates an assessment and plan.
4. Staff records interactions and placements.
5. Staff updates retention milestones.
6. Program manager exports reports.

## Scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run test` - run unit tests
- `npm run seed` - seed Supabase with demo data
