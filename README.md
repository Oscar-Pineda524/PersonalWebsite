# Personal Portfolio

A recruiter-focused computer science portfolio built with Next.js App Router,
TypeScript, Tailwind CSS, Framer Motion, Supabase, and Lucide React.

This repository currently contains the project foundation only. The complete
channel interface has intentionally not been implemented.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- A Supabase project when database-backed content is introduced

## Create the project from scratch

If you are reproducing this setup in a new directory, run:

```powershell
npx create-next-app@latest personal-portfolio --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm
Set-Location personal-portfolio
npm install framer-motion @supabase/supabase-js lucide-react
Copy-Item .env.local.example .env.local
npm run dev
```

The current repository has already been scaffolded, so use the shorter local
setup below instead.

## Local development

Install dependencies:

```powershell
npm install
```

Create your local environment file:

```powershell
Copy-Item .env.local.example .env.local
```

Add the public URL and publishable key from your Supabase project settings.
Values prefixed with `NEXT_PUBLIC_` are included in browser code. Never place a
Supabase secret key or service-role key in one of these variables.

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run build
```

`next build` does not run ESLint automatically, so linting and type checking
remain separate checks.

## Environment variables

| Variable | Visibility | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | Browser-safe Supabase publishable key |

Keep private credentials unprefixed and use them only in server-only modules.
No private Supabase key is required by this initial setup.

## Recommended structure

```text
personal-portfolio/
├── public/                         # Static images, icons, documents, and media
├── src/
│   ├── app/
│   │   ├── about/                  # About channel route
│   │   ├── contact/                # Contact channel route
│   │   ├── experience/             # Experience channel route
│   │   ├── projects/
│   │   │   └── [slug]/             # Individual project case studies
│   │   ├── resume/                 # Résumé channel route
│   │   ├── globals.css             # Design tokens and global styles
│   │   ├── layout.tsx              # Root document layout and metadata
│   │   └── page.tsx                # Main channel menu route
│   ├── components/
│   │   ├── channels/               # Channel cards and channel-specific UI
│   │   ├── layout/                 # Header, navigation, and footer
│   │   └── ui/                     # Reusable presentation primitives
│   ├── content/                    # Typed portfolio copy and static content
│   ├── lib/
│   │   └── supabase/               # Supabase clients, queries, and helpers
│   └── types/                      # Shared TypeScript domain definitions
├── .env.local.example
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

Route and component folders should be added as their phases are implemented.
Keeping unused directories out of the initial commit avoids placeholder code.

## Design-system foundation

Global CSS custom properties in `src/app/globals.css` define:

- Semantic colors for canvas, surfaces, text, borders, status, and focus
- Responsive typography
- Spacing and radius scales
- Content width and shadow
- Motion duration and easing

The foundation includes visible keyboard focus, a skip link, and a global
`prefers-reduced-motion` fallback. Future animations should still use Framer
Motion's reduced-motion APIs for component-specific behavior.

## Supabase usage

`getSupabaseBrowserClient` creates the browser client lazily, so pages that do
not use Supabase can render without local credentials. Before exposing data:

1. Enable Row Level Security on each public table.
2. Add explicit least-privilege policies.
3. Generate database types and use them with `SupabaseClient`.
4. Add loading, empty, and error states to every data-driven view.
5. Keep secret and service-role keys in server-only environments.
