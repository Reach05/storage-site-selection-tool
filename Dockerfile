# ----------------------------------------
# Stage 1: Build
# ----------------------------------------
# • Use a patched Alpine image by pinning to its digest
FROM node:18.16.1-alpine3.18@sha256:YOUR_UP_TO_DATE_DIGEST AS builder
WORKDIR /app

# Install build deps & copy early for caching
COPY package.json package-lock.json ./
COPY scripts ./scripts
RUN npm ci \
 && npm run postinstall

# Copy the rest & build
COPY . .
RUN npm run build

# ----------------------------------------
# Stage 2: Production
# ----------------------------------------
# • Same patched base, upgrade at container start just in case
FROM node:18.16.1-alpine3.18@sha256:YOUR_UP_TO_DATE_DIGEST AS runner
WORKDIR /app

# Make sure Alpine pkgs are up-to-date
RUN apk update && apk upgrade --no-cache \
 && rm -rf /var/cache/apk/*

# Pull in only the standalone build + public assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.cjs"]