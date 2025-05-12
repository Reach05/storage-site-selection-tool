#!/usr/bin/env bash
set -euo pipefail

echo "→ GOOGLE_CLOUD_PROJECT_ID env-var: '${GOOGLE_CLOUD_PROJECT_ID-<unset>}'"

# Try gcloud next
GCLOUD_PID=$(gcloud config get-value core/project 2>/dev/null || echo "<gcloud error>")
echo "→ gcloud core/project: '$GCLOUD_PID'"

if [[ -n "${GOOGLE_CLOUD_PROJECT_ID-}" ]]; then
  echo "✅ Using env-var PROJECT_ID=$GOOGLE_CLOUD_PROJECT_ID"
elif [[ -n "$GCLOUD_PID" && "$GCLOUD_PID" != "<gcloud error>" ]]; then
  echo "✅ Using gcloud PROJECT_ID=$GCLOUD_PID"
else
  echo "❌ No PROJECT_ID found!"
  exit 1
fi
