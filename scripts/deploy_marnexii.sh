#!/bin/bash

##########################################################################
# deploy_marnexii.sh
#
# Purpose:
#   Automate build, staging, and deployment of Next.js app (marnexii-pitch-deck)
#   using PM2 and separate DEV and RUNTIME folders.
#
# Reason:
#   To safely deploy production app without running from live development folder.
#   To ensure .next is never rebuilt while serving live traffic.
#   To enable single-command, repeatable deployments.
#
# Assumptions:
#   - You have a DEV folder where you develop and build (defined below).
#   - You want to deploy to a separate RUNTIME folder (TARGET_DIR).
#   - You use PM2 to run the app (with ecosystem.config.js).
#   - App listens on port 5000 (configured in ecosystem or .env).
#
# Dependencies:
#   - nodejs, npm
#   - pm2 installed globally (npm install -g pm2)
#   - ecosystem.config.js present in DEV folder.
#   - You must have sudo access (the script checks for it).
#
# Usage:
#   ./deploy_marnexii.sh [OPTIONS]
#
# Options:
#   --build        Build the app
#   --stage        Stage (copy) build to target folder
#   --run          Start app with PM2
#   --max          Use max instances (cluster mode)
#   --stop         Stop PM2 app
#   --status       Show PM2 app status
#   --logs         Tail PM2 logs
#   --letsgo       Shortcut: --build --stage --run
#   --noci         Skip npm ci and @types/react install (faster local build)
#   --help         Show this help message
#
##########################################################################

# Configuration
DEV_DIR="/home/tobieapb/ptsc-github/marnexii-pitch-deck"
TARGET_DIR="/opt/marnexii-pitch-deck"
PM2_APP_NAME="marnexii-pitch-deck"
USER_NAME="tobieapb"
GROUP_NAME="tobieapb"

# Canary: check for sudo access with real command
DATE=$(sudo date --iso-8601=seconds 2>/dev/null) || {
  echo "❌ You must have sudo privileges to run this script."
  exit 1
}

echo "✅ Sudo capabilities confirmed on: ${DATE}"

# Function: show help
show_help() {
  echo ""
  echo "🚀 deploy_marnexii.sh - Manage deployment of ${PM2_APP_NAME}"
  echo ""
  echo "Usage: ./scripts/deploy_marnexii.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --build          Build the app (npm ci + npm run build)"
  echo "  --stage          Copy build and dependencies to target folder"
  echo "  --run            Start app with PM2"
  echo "  --max            Use max instances (cluster mode) when running"
  echo "  --instances <n>  Use a specific number of instances in cluster mode"
  echo "  --stop           Stop the PM2 app"
  echo "  --status         Show PM2 app status"
  echo "  --logs           Tail PM2 app logs"
  echo "  --letsgo         Shortcut: --build --stage --run"
  echo "  --noci           Skip npm ci and @types/react install (faster local build)"
  echo "  --help           Show this help message"
  echo ""
}

# Parse arguments
BUILD=false
STAGE=false
RUN=false
USE_MAX=false
SHOW_STATUS=false
SHOW_LOGS=false
STOP_APP=false
NOCI=false
INSTANCE_COUNT=""


if [ $# -eq 0 ]; then
  show_help
  exit 0
fi

while [ $# -gt 0 ]; do
  case "$1" in
    --build)
      BUILD=true
      shift
      ;;
    --stage)
      STAGE=true
      shift
      ;;
    --run)
      RUN=true
      shift
      ;;
    --max)
      if [ -n "${INSTANCE_COUNT}" ]; then
        echo "❌ Error: Cannot use --max and --instances at the same time."
        exit 1
      fi
      USE_MAX=true
      shift
      ;;
    --instances)
      if [ "${USE_MAX}" = true ]; then
        echo "❌ Error: Cannot use --instances and --max at the same time."
        exit 1
      fi
      # Check if the next argument is a positive integer
      if [[ "$2" =~ ^[1-9][0-9]*$ ]]; then
        INSTANCE_COUNT="$2"
        shift 2 # shift past flag and value
      else
        echo "❌ Error: --instances requires a positive integer value."
        exit 1
      fi
      ;;
    --stop)
      STOP_APP=true
      shift
      ;;
    --status)
      SHOW_STATUS=true
      shift
      ;;
    --logs)
      SHOW_LOGS=true
      shift
      ;;
    --letsgo)
      BUILD=true
      STAGE=true
      RUN=true
      shift
      ;;
    --noci)
      NOCI=true
      shift
      ;;
    --help)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      show_help
      exit 1
      ;;
  esac
done

# STEP 1: Build and then stop currently running app
if [ "${BUILD}" = true ]; then
  echo "🔨 Building the app..."
  cd "${DEV_DIR}" || { echo "Failed to enter ${DEV_DIR}"; exit 1; }

  if [ "${NOCI}" != true ]; then
    echo "📦 Running npm ci (clean install)..."
    npm ci --omit=dev --legacy-peer-deps || { echo "npm ci failed"; exit 1; }
    echo "📦 Installing @types/react..."
    npm i @types/react --legacy-peer-deps || { echo "Failed to install @types/react"; exit 1; }
    npm i @types/estree --legacy-peer-deps || { echo "Failed to install @types/estree"; exit 1; }
  else
    echo "⚙️  Skipping npm ci and @types/react install (per --noci flag)..."
  fi

  npm run build || { echo "npm run build failed"; exit 1; }
  echo "✅ Build complete."
fi


# STEP 2: Stage (copy)
if [ "${STAGE}" = true ]; then
  echo "🚚 Staging app to ${TARGET_DIR}..."
  sudo rm -rf "${TARGET_DIR}"/*
  sudo mkdir -p "${TARGET_DIR}"
  sudo chown -R "${USER_NAME}:${GROUP_NAME}" "${TARGET_DIR}"

  cp -r "${DEV_DIR}/.next" "${TARGET_DIR}/"
  cp -r "${DEV_DIR}/node_modules" "${TARGET_DIR}/"
  cp -r "${DEV_DIR}/public" "${TARGET_DIR}/"
  cp "${DEV_DIR}/package.json" "${TARGET_DIR}/"
  cp "${DEV_DIR}/package-lock.json" "${TARGET_DIR}/"
  cp "${DEV_DIR}/ecosystem.config.js" "${TARGET_DIR}/"
  cp "${DEV_DIR}/.env.local" "${TARGET_DIR}/" 2>/dev/null || echo "No .env.local file found, skipping."

  echo "✅ Staging complete."
fi

# STEP 3: Run
if [ "${RUN}" = true ]; then
  echo "🚀 Preparing to run the app..."

  # Check if the app is running and delete it if it is
  echo "🛑 Checking for existing PM2 process..."
  if pm2 describe "${PM2_APP_NAME}" > /dev/null 2>&1; then
    echo "- Existing process found. Deleting it..."
    pm2 delete "${PM2_APP_NAME}" || { echo "❌ Failed to delete old PM2 process."; exit 1; }
    echo "✅ Old PM2 process cleared."
  else
    echo "✅ No existing PM2 process found. Continuing."
  fi

  echo "🚀 Running the app from ${TARGET_DIR}..."
  cd "${TARGET_DIR}" || { echo "Failed to enter ${TARGET_DIR}"; exit 1; }

  # Dynamically configure the ecosystem file before starting, based on flags.
  if [ -n "${INSTANCE_COUNT}" ]; then
    echo "⚙️  Configuring for ${INSTANCE_COUNT} instances (cluster mode)..."
    sed -i "s/^\s*instances:.*/        instances: '${INSTANCE_COUNT}',/" ecosystem.config.js
    sed -i "s/^\s*exec_mode:.*/        exec_mode: 'cluster',/" ecosystem.config.js
  elif [ "${USE_MAX}" = true ]; then
    echo "⚙️  Configuring for max instances (cluster mode)..."
    sed -i "s/^\s*instances:.*/        instances: 'max',/" ecosystem.config.js
    sed -i "s/^\s*exec_mode:.*/        exec_mode: 'cluster',/" ecosystem.config.js
  else
    echo "⚙️  Configuring for single instance (cluster mode)..."
    sed -i "s/^\s*instances:.*/        instances: '1',/" ecosystem.config.js
    sed -i "s/^\s*exec_mode:.*/        exec_mode: 'cluster',/" ecosystem.config.js
  fi

  # Start the app using the now-modified ecosystem file
  echo "🚀 Starting app with PM2..."
  pm2 start ecosystem.config.js --name "${PM2_APP_NAME}" || { echo "❌ Failed to start the app."; exit 1; }

  echo "💾 Saving PM2 process list to survive reboots..."
  pm2 save || { echo "⚠️  Failed to save PM2 process list."; }

  echo "✅ App is running under PM2 and configuration is saved."
fi

# STEP 4: Stop app
if [ "${STOP_APP}" = true ]; then
  echo "🛑 Stopping PM2 app ${PM2_APP_NAME}..."
  pm2 stop "${PM2_APP_NAME}" || echo "PM2 app not running."
  pm2 delete "${PM2_APP_NAME}" || echo "PM2 app not found."
  pm2 save
  echo "✅ App stopped."
fi

# STEP 5: Show status
if [ "${SHOW_STATUS}" = true ]; then
  echo "📊 PM2 status for ${PM2_APP_NAME}:"
  pm2 status "${PM2_APP_NAME}"
fi

# STEP 6: Show logs
if [ "${SHOW_LOGS}" = true ]; then
  echo "📜 Tailing PM2 logs for ${PM2_APP_NAME} (press Ctrl+C to exit)..."
  pm2 logs "${PM2_APP_NAME}"
fi
