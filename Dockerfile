ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++ bash
WORKDIR /website

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g corepack@latest && corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /website

COPY --from=deps /website/node_modules ./node_modules
COPY . .

# Add env for production
# COPY .docker/production/.env.local .env.local

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_OPTIONS=--max_old_space_size=8192
ARG NEXT_PUBLIC_GOOGLE_GTM_ID
ENV NEXT_PUBLIC_GOOGLE_GTM_ID=$NEXT_PUBLIC_GOOGLE_GTM_ID
ARG NEXT_PUBLIC_GITHUB_RUN_DATE
ENV NEXT_PUBLIC_GITHUB_RUN_DATE=$NEXT_PUBLIC_GITHUB_RUN_DATE
ARG NEXT_PUBLIC_GITHUB_RUN_ID
ENV NEXT_PUBLIC_GITHUB_RUN_ID=$NEXT_PUBLIC_GITHUB_RUN_ID
ARG NEXT_PUBLIC_GITHUB_RUN_NUMBER
ENV NEXT_PUBLIC_GITHUB_RUN_NUMBER=$NEXT_PUBLIC_GITHUB_RUN_NUMBER
ARG NEXT_PUBLIC_GITHUB_REPOSITORY
ENV NEXT_PUBLIC_GITHUB_REPOSITORY=$NEXT_PUBLIC_GITHUB_REPOSITORY
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ENV NEXT_PUBLIC_TINA_CLIENT_ID=$NEXT_PUBLIC_TINA_CLIENT_ID
ARG NEXT_PUBLIC_TINA_BRANCH
ENV NEXT_PUBLIC_TINA_BRANCH=$NEXT_PUBLIC_TINA_BRANCH
ARG KEY_VAULT
ENV KEY_VAULT=$KEY_VAULT
ARG NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING
ENV NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING=$NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING
ARG TINA_TOKEN
ENV TINA_TOKEN=$TINA_TOKEN
ARG NEXT_PUBLIC_CHATBASE_BOT_ID
ENV NEXT_PUBLIC_CHATBASE_BOT_ID=$NEXT_PUBLIC_CHATBASE_BOT_ID
ARG SITE_URL
ENV SITE_URL=$SITE_URL
ARG YOUTUBE_PRIVATE_KEY
ENV YOUTUBE_PRIVATE_KEY=$YOUTUBE_PRIVATE_KEY
ARG TINA_SEARCH_TOKEN
ENV TINA_SEARCH_TOKEN=$TINA_SEARCH_TOKEN
ARG NEXT_PUBLIC_SLOT_URL
ENV NEXT_PUBLIC_SLOT_URL=$NEXT_PUBLIC_SLOT_URL



RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g corepack@latest && corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /website

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /website/public ./public

# Set the correct permissions for the tina cache folder
RUN mkdir -p /website/tina
RUN chown nextjs:nodejs /website/tina

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /website/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /website/appInsight-api.js ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
