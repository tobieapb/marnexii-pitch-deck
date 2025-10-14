# Marnexii Pitch Deck Deployment

This document outlines the process for deploying the Marnexii Pitch Deck application using the provided `deploy_marnexii.sh` script. This process is consistent with the deployment strategy of other projects in this repository.

## Deployment Process

The deployment process involves two main stages:

1.  **Build:** The Next.js application is built for production.
2.  **Stage:** The built application and its dependencies are copied to a dedicated directory (`/opt/marnexii-pitch-deck`).
3.  **Run:** The application is started from the staged directory using `pm2`.

This process ensures that the development and production environments are kept separate, and that the application is run in a consistent and reliable manner.

## Usage

The `deploy_marnexii.sh` script is used to manage the deployment process. It is located in the `scripts` directory.

### Options

*   `--build`: Build the app (`npm ci` + `npm run build`)
*   `--stage`: Copy build and dependencies to the target folder
*   `--run`: Start the app with PM2
*   `--max`: Use the maximum number of instances (cluster mode) when running
*   `--instances <n>`: Use a specific number of instances in cluster mode
*   `--stop`: Stop the PM2 app
*   `--status`: Show the PM2 app status
*   `--logs`: Tail the PM2 app logs
*   `--letsgo`: Shortcut for `--build --stage --run`
*   `--noci`: Skip `npm ci` and `@types/react` install (for a faster local build)
*   `--help`: Show the help message

### Examples

**Full Deployment (Cluster Mode, Max Instances):**

```bash
./scripts/deploy_marnexii.sh --letsgo --max
```

**Just Build and Stage:**

```bash
./scripts/deploy_marnexii.sh --build --stage
```

**Restart the App:**

```bash
./scripts/deploy_marnexii.sh --run --max
```

**Stop the App:**

```bash
./scripts/deploy_marnexii.sh --stop
```
