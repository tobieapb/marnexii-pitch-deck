# MARNEXII Pitch Deck - Complete Installation Guide

## System Requirements ✓

Your system meets all requirements:
- ✅ Ubuntu 24.04 LTS (AWS)
- ✅ Node.js v22.18.0 (Required: v18.17 or higher)
- ✅ npm v10.9.3 (Required: v9 or higher)
- ✅ x86_64 architecture

---

## Installation Methods

Choose one of three methods based on your workflow:

### Method 1: Download from v0 (Recommended for First-Time Setup)

#### Step 1: Export the Project

In the v0 interface:
1. Click the **three dots (...)** in the top right corner
2. Select **"Download ZIP"**
3. Save `marnexii-pitch.zip` to your machine

#### Step 2: Transfer to Your Server

\`\`\`bash
# On your local machine (if downloaded locally)
scp marnexii-pitch.zip tobieapb@your-server-ip:~/

# On your server
cd ~
unzip marnexii-pitch.zip
cd marnexii-pitch
\`\`\`

#### Step 3: Install Dependencies

\`\`\`bash
# Install all required packages
npm install

# This installs:
# - Next.js 15.x
# - React 19.x
# - Tailwind CSS v4
# - TypeScript
# - All shadcn/ui components
# - Framer Motion (for animations)
\`\`\`

**Expected output:**
\`\`\`
added 324 packages, and audited 325 packages in 45s

128 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
\`\`\`

#### Step 4: Verify Installation

\`\`\`bash
# Check that all dependencies are installed
npm list --depth=0

# You should see:
# ├── next@15.x.x
# ├── react@19.x.x
# ├── tailwindcss@4.x.x
# └── ... (other packages)
\`\`\`

#### Step 5: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

**Expected output:**
\`\`\`
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.14.90:3000

 ✓ Starting...
 ✓ Ready in 2.3s
\`\`\`

#### Step 6: Verify It's Working

Open your browser and navigate to:
- Local: `http://localhost:3000`
- Network: `http://192.168.14.90:3000` (from other devices on your network)

**You should see:**
- Slide 1: "MARNEXII" title with mission-critical tagline
- Smooth scroll navigation working
- Arrow keys and mouse wheel navigation functional

---

### Method 2: Clone from GitHub (Recommended for Version Control)

#### Step 1: Push to GitHub from v0

In the v0 interface:
1. Click the **GitHub logo** in the top right
2. Authorize v0 to access your GitHub account
3. Create a new repository (e.g., `marnexii-pitch-deck`)
4. v0 will push all code to your repo

#### Step 2: Clone to Your Server

\`\`\`bash
cd ~
git clone https://github.com/YOUR_USERNAME/marnexii-pitch-deck.git
cd marnexii-pitch-deck

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

**Benefits of this method:**
- Full version control with Git
- Easy to make changes and commit them
- Can deploy directly from GitHub to Vercel/Netlify
- Collaborate with others

---

### Method 3: Direct Vercel Deployment (Fastest for Production)

#### Step 1: Deploy from v0

In the v0 interface:
1. Click **"Publish"** in the top right
2. Connect your Vercel account
3. Choose a project name (e.g., `marnexii-pitch`)
4. Click **"Deploy"**

**You'll get:**
- Live URL: `https://marnexii-pitch.vercel.app`
- Automatic HTTPS
- Global CDN
- Zero configuration

#### Step 2: Access Your Deployment

Your presentation will be live at:
\`\`\`
https://your-project-name.vercel.app
\`\`\`

---

## Understanding the Project Structure

\`\`\`
marnexii-pitch/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main presentation container
│   └── globals.css         # Tailwind v4 config + design tokens
├── components/
│   ├── slide-navigation.tsx    # Dot navigation
│   └── slides/
│       ├── title-slide.tsx
│       ├── problem-slide.tsx
│       ├── shift-slide.tsx
│       ├── solution-slide.tsx
│       ├── why-now-slide.tsx
│       ├── traction-slide.tsx
│       ├── product-slide.tsx
│       ├── market-slide.tsx
│       ├── business-model-slide.tsx
│       ├── team-slide.tsx
│       └── vision-slide.tsx
├── public/
│   └── [images]            # All slide images
├── package.json
├── tsconfig.json
├── next.config.mjs
└── INSTALLATION.md         # This file
\`\`\`

---

## Design Token System (No Hardcoding Needed!)

### How It Works

All colors are defined in `app/globals.css` using CSS variables:

\`\`\`css
@theme inline {
  /* Core colors */
  --background: oklch(0.08 0 0);      /* Deep black */
  --foreground: oklch(0.98 0 0);      /* Almost white */
  --card: oklch(0.12 0 0);            /* Slightly lighter black */
  --card-foreground: oklch(0.98 0 0); /* Card text */
  
  /* Brand colors */
  --primary: oklch(0.45 0.15 240);    /* Ocean blue */
  --primary-foreground: oklch(0.98 0 0);
  
  /* Accent colors */
  --accent: oklch(0.65 0.2 150);      /* Radar green */
  --accent-foreground: oklch(0.08 0 0);
  
  /* UI colors */
  --muted: oklch(0.25 0 0);
  --muted-foreground: oklch(0.65 0 0);
  --border: oklch(0.2 0 0);
  
  /* Semantic colors */
  --destructive: oklch(0.55 0.25 25);
  --destructive-foreground: oklch(0.98 0 0);
  
  /* Radius */
  --radius: 0.5rem;
}
\`\`\`

### Using Design Tokens in Code

**Instead of hardcoding:**
\`\`\`tsx
// ❌ DON'T DO THIS
<div className="bg-[#0a0a0a] text-[#f5f5f5]">
\`\`\`

**Use design tokens:**
\`\`\`tsx
// ✅ DO THIS
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-accent text-accent-foreground">
\`\`\`

### Why This Works Better

1. **Always Available** - CSS variables don't get purged by Tailwind
2. **Consistent** - Same colors across all components
3. **Themeable** - Change one value, updates everywhere
4. **Type-Safe** - TypeScript knows about these classes
5. **No Compilation Issues** - Works in dev and production

### Available Design Tokens

| Token | Usage | Example |
|-------|-------|---------|
| `bg-background` | Main background | Slide backgrounds |
| `text-foreground` | Main text | Body text, headings |
| `bg-primary` | Brand color | Links, highlights |
| `text-primary` | Brand text | Emphasized text |
| `bg-accent` | Accent color | "deployed" text, highlights |
| `text-accent` | Accent text | Green highlights |
| `bg-card` | Card backgrounds | Feature cards |
| `border-border` | Borders | Card borders, dividers |
| `bg-muted` | Subtle backgrounds | Hover states |
| `text-muted-foreground` | Secondary text | Captions, notes |

---

## Building for Production

### Step 1: Create Production Build

\`\`\`bash
npm run build
\`\`\`

**Expected output:**
\`\`\`
  ▲ Next.js 15.x.x

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (12/12)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95.3 kB
└ ○ /_not-found                          871 B          85.9 kB

○  (Static)  prerendered as static content

✓ Build completed in 18s
\`\`\`

### Step 2: Test Production Build Locally

\`\`\`bash
npm start
\`\`\`

This starts the production server on `http://localhost:3000`

**Verify:**
- All slides load correctly
- Navigation works smoothly
- Images display properly
- No console errors

---

## Deploying to Your Own Server

### Option A: Using PM2 (Recommended)

PM2 keeps your app running and restarts it if it crashes.

#### Install PM2

\`\`\`bash
sudo npm install -g pm2
\`\`\`

#### Start Your App

\`\`\`bash
# From your project directory
cd ~/marnexii-pitch

# Build for production
npm run build

# Start with PM2
pm2 start npm --name "marnexii-pitch" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Follow the instructions it prints
\`\`\`

#### Manage Your App

\`\`\`bash
# Check status
pm2 status

# View logs
pm2 logs marnexii-pitch

# Restart
pm2 restart marnexii-pitch

# Stop
pm2 stop marnexii-pitch

# Delete
pm2 delete marnexii-pitch
\`\`\`

### Option B: Using systemd

Create a systemd service for automatic startup.

#### Create Service File

\`\`\`bash
sudo nano /etc/systemd/system/marnexii-pitch.service
\`\`\`

**Add this content:**
\`\`\`ini
[Unit]
Description=MARNEXII Pitch Deck
After=network.target

[Service]
Type=simple
User=tobieapb
WorkingDirectory=/home/tobieapb/marnexii-pitch
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
\`\`\`

#### Enable and Start Service

\`\`\`bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service (start on boot)
sudo systemctl enable marnexii-pitch

# Start service
sudo systemctl start marnexii-pitch

# Check status
sudo systemctl status marnexii-pitch

# View logs
sudo journalctl -u marnexii-pitch -f
\`\`\`

---

## Setting Up Nginx Reverse Proxy

To serve your presentation on port 80/443 with a domain name.

### Install Nginx

\`\`\`bash
sudo apt update
sudo apt install nginx
\`\`\`

### Configure Nginx

\`\`\`bash
sudo nano /etc/nginx/sites-available/marnexii-pitch
\`\`\`

**Add this configuration:**
\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

### Enable Site

\`\`\`bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/marnexii-pitch /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
\`\`\`

### Add SSL with Let's Encrypt (Optional but Recommended)

\`\`\`bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Certbot will automatically configure HTTPS
\`\`\`

---

## Troubleshooting

### Issue: Port 3000 Already in Use

\`\`\`bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
\`\`\`

### Issue: Permission Denied

\`\`\`bash
# Fix ownership
sudo chown -R tobieapb:tobieapb ~/marnexii-pitch

# Fix permissions
chmod -R 755 ~/marnexii-pitch
\`\`\`

### Issue: Module Not Found

\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
\`\`\`

### Issue: Build Fails

\`\`\`bash
# Check Node version
node -v  # Should be v18.17 or higher

# Update npm
npm install -g npm@latest

# Try building with verbose output
npm run build --verbose
\`\`\`

### Issue: Images Not Loading

\`\`\`bash
# Verify images exist
ls -la public/

# Check Next.js image optimization
# Images should be in /public directory
# Reference them as /image-name.jpg (not /public/image-name.jpg)
\`\`\`

### Issue: Styles Not Applying

\`\`\`bash
# Verify Tailwind v4 is installed
npm list tailwindcss

# Check globals.css is imported in layout.tsx
# Should have: import './globals.css'

# Clear Next.js cache
rm -rf .next
npm run dev
\`\`\`

---

## Performance Optimization

### Enable Compression

In `next.config.mjs`:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
\`\`\`

### Optimize Images

\`\`\`bash
# Install sharp for better image optimization
npm install sharp
\`\`\`

### Enable Caching in Nginx

Add to your Nginx config:
\`\`\`nginx
location /_next/static/ {
    alias /home/tobieapb/marnexii-pitch/.next/static/;
    expires 365d;
    access_log off;
}

location /images/ {
    alias /home/tobieapb/marnexii-pitch/public/;
    expires 30d;
    access_log off;
}
\`\`\`

---

## Updating the Presentation

### Method 1: Pull from GitHub

\`\`\`bash
cd ~/marnexii-pitch
git pull origin main
npm install  # If dependencies changed
npm run build
pm2 restart marnexii-pitch
\`\`\`

### Method 2: Re-download from v0

\`\`\`bash
# Backup current version
mv ~/marnexii-pitch ~/marnexii-pitch.backup

# Download new version and repeat installation steps
\`\`\`

---

## Monitoring and Logs

### View Application Logs

\`\`\`bash
# With PM2
pm2 logs marnexii-pitch

# With systemd
sudo journalctl -u marnexii-pitch -f

# Next.js logs (if running directly)
npm start 2>&1 | tee app.log
\`\`\`

### Monitor Resource Usage

\`\`\`bash
# With PM2
pm2 monit

# System resources
htop
\`\`\`

---

## Security Checklist

- [ ] Firewall configured (allow only 80, 443, 22)
- [ ] SSH key authentication enabled
- [ ] SSL certificate installed (HTTPS)
- [ ] Nginx security headers configured
- [ ] Regular system updates scheduled
- [ ] PM2 or systemd service running as non-root user
- [ ] File permissions set correctly (755 for directories, 644 for files)

### Configure Firewall

\`\`\`bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
\`\`\`

---

## Quick Reference Commands

\`\`\`bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# PM2 Management
pm2 start npm --name "marnexii-pitch" -- start
pm2 stop marnexii-pitch
pm2 restart marnexii-pitch
pm2 logs marnexii-pitch
pm2 monit

# Nginx
sudo systemctl restart nginx
sudo systemctl status nginx
sudo nginx -t

# System Service
sudo systemctl start marnexii-pitch
sudo systemctl stop marnexii-pitch
sudo systemctl restart marnexii-pitch
sudo systemctl status marnexii-pitch
\`\`\`

---

## Support and Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **PM2 Documentation**: https://pm2.keymetrics.io/docs
- **Nginx Documentation**: https://nginx.org/en/docs

---

## Summary

Your system is perfectly configured for this project. The recommended installation path is:

1. **Download ZIP from v0** → Transfer to server
2. **Run `npm install`** → Installs all dependencies
3. **Run `npm run build`** → Creates production build
4. **Use PM2 to run** → Keeps app running reliably
5. **Configure Nginx** → Serve on port 80/443 with domain
6. **Add SSL** → Secure with Let's Encrypt

**Total setup time: ~15 minutes**

The design token system ensures you'll never need to hardcode colors - everything uses semantic CSS variables that work consistently across the entire presentation.
