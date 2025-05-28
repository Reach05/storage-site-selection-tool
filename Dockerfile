# ----------------------------------------
# Stage 1: Build
# ----------------------------------------
FROM node:24-alpine3.21 AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source, fetch ArcGIS assets, build & prune dev deps
COPY . .
RUN npm run postinstall \
 && npm run build \
 && npm prune --production

# ----------------------------------------
# Stage 2: Production
# ----------------------------------------
FROM node:24-alpine3.21 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only the production artifacts
COPY --from=builder /app/package.json       ./package.json
COPY --from=builder /app/next.config.mjs    ./next.config.mjs
COPY --from=builder /app/.next              ./.next
COPY --from=builder /app/public             ./public
COPY --from=builder /app/node_modules       ./node_modules

# Copy custom HTTPS server and certificates (if applicable)
COPY --from=builder /app/server.cjs          ./server.cjs
COPY --from=builder /app/certs               ./certs

# Drop to a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

# Optional healthcheck (adjust protocol/URL if using HTTPS)
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Start the custom HTTPS server
CMD ["node", "server.cjs"]