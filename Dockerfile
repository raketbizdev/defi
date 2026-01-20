# syntax=docker/dockerfile:1.7

FROM node:20.19.0-bookworm-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20.19.0-bookworm-slim AS dev
WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5173

# Vite must bind to 0.0.0.0 inside containers
CMD ["npm", "run", "dev:frontend", "--", "--host", "0.0.0.0", "--port", "5173"]