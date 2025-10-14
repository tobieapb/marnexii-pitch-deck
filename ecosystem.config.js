/***************************************************************************
 * ecosystem.config.js
 *
 * Purpose:
 *   Define how PM2 runs the Next.js production app for marnexii-pitch-deck.
 *
 * Reason:
 *   To ensure PM2 runs the "baked" version of the app staged in /opt/marnexii-pitch-deck,
 *   NOT from the live development folder.
 *
 * Assumptions:
 *   - You use a deployment script to stage your app to /opt/marnexii-pitch-deck
 *   - You copy .next/, node_modules/, public/, package.json, .env.local, etc. there
 *   - You want PM2 to run next start from /opt/marnexii-pitch-deck
 *
 * Dependencies:
 *   - PM2 must be installed globally (npm install -g pm2)
 *   - /opt/marnexii-pitch-deck must contain a baked Next.js build (npm run build)
 *
 * Notes:
 *   - PM2 uses cwd: '/opt/marnexii-pitch-deck' to ensure it runs from the staged folder
 *   - PM2 injects NODE_ENV and PORT here, but also reads from .env.local
 ***************************************************************************/

module.exports = {
  apps: [
    {
      name: 'marnexii-pitch-deck',

      // Script to run (Next.js start command)
      script: 'node_modules/next/dist/bin/next',

      // Arguments to pass to the script
      args: 'start',

      // Run in cluster mode (multiple processes)
      instances: 'max', // Let PM2 decide based on available CPUs

      // Cluster or fork mode
      exec_mode: 'cluster',

      // VERY IMPORTANT: run from the staged deploy folder
      cwd: '/opt/marnexii-pitch-deck',

      // Environment variables injected by PM2
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
