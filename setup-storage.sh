#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# setup-storage.sh
#
# This script bootstraps the Storage Site Selection Tool repo with best‐practice
# CI/CD, Docker, Vercel, and GCP configs, and removes generated extras.
#
# Usage:
#   export GITHUB_TOKEN=your_personal_access_token
#   ./setup-storage.sh
# =============================================================================

# ----- Configuration -----
# Adjust this path if your local clone lives elsewhere
REPO_PATH="/c/Projects/storage-site-selection-tool"
GH_ORG="Reach05"
REPO_NAME="storage-site-selection-tool"
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${GH_ORG}/${REPO_NAME}.git"

# Ensure a GitHub token is provided
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Error: GITHUB_TOKEN not set. Export your PAT first:"
  echo "  export GITHUB_TOKEN=your_personal_access_token"
  exit 1
fi

# ----- Enter the repository -----
cd "${REPO_PATH}"

# ----- 1) Create GitHub Actions workflows -----
mkdir -p .github/workflows

cat > .github/workflows/ci.yml << 'EOF'
name: 📦 CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
EOF

cat > .github/workflows/release.yml << 'EOF'
name: 🚀 Release ZIP

on:
  push:
    branches: [ main ]

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Create ZIP archive
        run: zip -r site-selection-tool.zip ./*

      - name: Create GitHub Release
        id: create_release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v${{ github.run_number }}
          name: Release ${{ github.run_number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Upload ZIP to Release
        uses: softprops/action-gh-release@v1
        with:
          files: site-selection-tool.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
EOF

# ----- 2) Dockerfile -----
cat > Dockerfile << 'EOF'
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm","start"]
EOF

# ----- 3) build-and-deploy.sh -----
cat > build-and-deploy.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail

echo "🛠 Building Next.js app..."
npm run build

IMAGE="us-central1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT_ID}/site-selection-tool/site-selection-tool:latest"
echo "🐳 Building Docker image ${IMAGE}..."
docker build -t "${IMAGE}" .

echo "🚀 Pushing to Artifact Registry..."
docker push "${IMAGE}"

echo "☁️ Deploying to Cloud Run..."
gcloud run deploy site-selection-tool \
  --image "${IMAGE}" \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}",NEXT_PUBLIC_ESRI_API_KEY="${NEXT_PUBLIC_ESRI_API_KEY}"
EOF
chmod +x build-and-deploy.sh

# ----- 4) vercel.json -----
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/next" }],
  "routes": [
    { "src": "/screenshots/(.*)", "dest": "/public/screenshots/$1" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
EOF

# ----- 5) .gcloudignore -----
cat > .gcloudignore << 'EOF'
node_modules/
.next/
.env.local
site-selection-screenshots-storage.zip
EOF

# ----- 6) Clean generated extras -----
git rm -r --cached screenshots site-selection-screenshots-storage.zip *.code-workspace 2>/dev/null || true
echo -e "screenshots/\nsite-selection-screenshots-storage.zip\n*.code-workspace" >> .gitignore

# ----- 7) Commit & push -----
git add .
git commit -m "Add CI/CD, Docker, Vercel & GCP configs and clean extras"
git push "${REMOTE_URL}" main

echo "✅ All missing configs added and pushed to GitHub!"
