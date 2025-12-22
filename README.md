This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase setup for local development

# Important: For Authentication

Use only password login for local development. For testing provider login use Supabase cloud instance.

This guide provides how to initialize a local supabase instance from scratch by pulling the cloud supabase instance of this project, clever-slides.

First of all you need to install [Docker](https://docs.docker.com/engine/install/) and [Supabase Cli](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows&queryGroups=access-method&access-method=studio)

# Start the supabase instance

For this to be executed docker desktop has to be running. It will start the supabase instance by downloading necessary docker images

```bash
supabase start
```

# Load cloud project changes

```bash
supabase db pull
```

# Apply those changes to supabase local database

Making the cloud changes included in the local supabase instance

```bash
supabase db reset
```
# Loading cloud database data into the local database

```bash
supabase db dump --data-only -f supabase/seed.sql
```

# Apply them locally

```bash
supabase db reset
```
# Creating local changes into a migrations

You can auto generate migrations which are done through the Supabase UI locally

```bash
supabase db diff -f "column_change"
```

# Push the local change to cloud instance

```bash
supabase db push
```

# If an error occurs

It's mainly because already existing tables are getting re-created. Repair migrations by running this command (23231311312 is an example migration timestamp, find the relevant timestamp of your initial schema)

```bash
supabase migration repair 23231311312 --status applied
```
