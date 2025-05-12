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
