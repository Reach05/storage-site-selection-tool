# ----------------------------------------
# Stage 1: Build
# ----------------------------------------
FROM node:slim AS builder
WORKDIR /app

# 1) Copy only package files and your copy‐assets script
COPY package.json package-lock.json ./
COPY scripts ./scripts

# 2) Install dependencies (this runs postinstall, which now finds scripts/)
RUN npm ci

# 3) Copy the rest of your source
COPY . .

# 4) (Re-run postinstall to catch any assets added after full copy)
RUN npm run postinstall

# 5) Build the Next.js app
RUN npm run build


# ----------------------------------------
# Stage 2: Production
# ----------------------------------------
FROM node:slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# 1) Copy runtime artifacts
COPY --from=builder /app/package.json        ./package.json
COPY --from=builder /app/next.config.mjs      ./next.config.mjs
COPY --from=builder /app/.next                ./.next
COPY --from=builder /app/node_modules         ./node_modules
COPY --from=builder /app/public               ./public

# 2) Copy your custom server and certs (if used in production)
COPY --from=builder /app/server.cjs           ./server.cjs
COPY --from=builder /app/certs                ./certs

# 3) Expose & start
EXPOSE 3000
CMD ["npm", "start"]
