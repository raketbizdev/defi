# syntax=docker/dockerfile:1.7
FROM node:20.19.0-bookworm-slim AS deps

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20.19.0-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY backend ./backend

ENV PORT=3001
EXPOSE 3001

CMD ["node", "backend/src/server.js"]
