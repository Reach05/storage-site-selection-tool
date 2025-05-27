# ----------------------------------------
# Stage 1: Build
# ----------------------------------------
FROM node:23-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source, fetch Esri assets, build and prune dev deps
COPY . .
RUN npm run postinstall \
 && npm run build \
 && npm prune --production

# ----------------------------------------
# Stage 2: Production
# ----------------------------------------
FROM node:23-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only the production artifacts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# If you use a custom server & certs:
COPY --from=builder /app/server.cjs ./server.cjs
COPY --from=builder /app/certs ./certs

EXPOSE 3000

# Start the HTTPS Next.js server
CMD ["npm", "start"]