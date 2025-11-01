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

## Deployment

This project uses a custom deployment script that builds, stages, and runs the app with PM2.

### Quick Deploy (Recommended)

Fast deployment when only code has changed (no dependency updates):

```bash
./scripts/deploy_marnexii.sh --letsgo --noci
```

This will:
- Build the app (skipping `npm ci` for speed)
- Stage to `/opt/marnexii-pitch-deck`
- Deploy with PM2 (single instance)

### Full Deploy

When dependencies have changed:

```bash
./scripts/deploy_marnexii.sh --letsgo
```

### Deployment Options

```bash
# Build only
./scripts/deploy_marnexii.sh --build

# Stage only (after build)
./scripts/deploy_marnexii.sh --stage

# Run with PM2
./scripts/deploy_marnexii.sh --run

# Stop the app
./scripts/deploy_marnexii.sh --stop

# Check status
./scripts/deploy_marnexii.sh --status

# View logs
./scripts/deploy_marnexii.sh --logs

# Use specific number of instances
./scripts/deploy_marnexii.sh --letsgo --instances 2

# Use max instances (cluster mode)
./scripts/deploy_marnexii.sh --letsgo --max
```

**Note:** The deployment script requires sudo privileges.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
