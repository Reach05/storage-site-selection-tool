#!/usr/bin/env bash
set -euo pipefail

# ─── Auto-load your .env.local ───
if [[ -f .env.local ]]; then
  echo "🔐 Loading .env.local…"
  set -a
  # shellcheck disable=SC2046
  source .env.local
  set +a
fi

# ─── 1) GRAB YOUR ACTIVE GCP PROJECT ───
PROJECT_ID=$(gcloud config get-value core/project 2>/dev/null || echo "")
if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "(unset)" ]]; then
  echo "❌ No GCP project detected."
  echo "   ▶️  Run: gcloud config set project YOUR_PROJECT_ID"
  exit 1
fi
echo "ℹ️  Deploying to GCP project: $PROJECT_ID"

# ─── 2) DEFINE SERVICE, REGION & REPO ───
SERVICE="storage-site-selection-tool"
REGION="us-central1"
REPO="site-selection"

# ─── 3) VERIFY YOUR ENVIRONMENT KEYS ───
for VAR in NEXT_PUBLIC_GOOGLE_MAPS_API_KEY NEXT_PUBLIC_ESRI_API_KEY \
           NEXT_PUBLIC_FEMA_API_KEY ARCGIS_CLIENT_ID ARCGIS_CLIENT_SECRET; do
  if [[ -z "${!VAR:-}" ]]; then
    echo "❌ Missing required env-var: $VAR"
    echo "   ▶️  Add it to .env.local or export it in your shell"
    exit 1
  fi
done

# ─── 4) ENABLE GCP APIS ───
echo "🔧 Enabling Cloud Build, Artifact Registry & Cloud Run APIs…"
gcloud services enable \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  --quiet

# ─── 5) BUILD & PUSH VIA CLOUD BUILD ───
IMAGE="us-central1-docker.pkg.dev/${PROJECT_ID}/${REPO}/${SERVICE}:latest"
echo "📦 Cloud Build submitting for image → $IMAGE"
gcloud builds submit . \
  --tag "$IMAGE" \
  --timeout="15m" \
  --project "$PROJECT_ID"

# ─── 6) DEPLOY OR UPDATE ON CLOUD RUN ───
echo "☁️ Deploying '$SERVICE' (region: $REGION)…"
gcloud run deploy "$SERVICE" \
  --image "$IMAGE" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars \
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}",\
NEXT_PUBLIC_ESRI_API_KEY="${NEXT_PUBLIC_ESRI_API_KEY}",\
NEXT_PUBLIC_FEMA_API_BASE="https://www.fema.gov/api/open",\
NEXT_PUBLIC_FEMA_API_KEY="${NEXT_PUBLIC_FEMA_API_KEY}",\
ARCGIS_CLIENT_ID="${ARCGIS_CLIENT_ID}",\
ARCGIS_CLIENT_SECRET="${ARCGIS_CLIENT_SECRET}" \
  --quiet

# ─── 7) FINISH ───
URL=$(gcloud run services describe "$SERVICE" \
       --platform managed --region "$REGION" \
       --format="value(status.url)")
echo
echo "✅ Deployment complete!  $URL"


