FROM node:19-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM base AS builder

# Build requires some environment variables -> source them as build args
ARG GOOGLE_RECAPTCHA_KEY
ENV GOOGLE_RECAPTCHA_KEY ${GOOGLE_RECAPTCHA_KEY}

ARG TINA_TOKEN
ENV TINA_TOKEN ${TINA_TOKEN}

ARG NEXT_PUBLIC_TINA_BRANCH
ENV NEXT_PUBLIC_TINA_BRANCH ${NEXT_PUBLIC_TINA_BRANCH}
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ENV NEXT_PUBLIC_TINA_CLIENT_ID ${NEXT_PUBLIC_TINA_CLIENT_ID}

ARG NEXT_PUBLIC_GITHUB_RUN_DATE
ENV NEXT_PUBLIC_GITHUB_RUN_DATE ${NEXT_PUBLIC_GITHUB_RUN_DATE}
ARG NEXT_PUBLIC_GITHUB_REPOSITORY
ENV NEXT_PUBLIC_GITHUB_REPOSITORY ${NEXT_PUBLIC_GITHUB_REPOSITORY}
ARG NEXT_PUBLIC_GITHUB_RUN_ID
ENV NEXT_PUBLIC_GITHUB_RUN_ID ${NEXT_PUBLIC_GITHUB_RUN_ID}
ARG NEXT_PUBLIC_GITHUB_RUN_NUMBER
ENV NEXT_PUBLIC_GITHUB_RUN_NUMBER ${NEXT_PUBLIC_GITHUB_RUN_NUMBER}

ARG NEXT_PUBLIC_GOOGLE_GTM_ID
ENV NEXT_PUBLIC_GOOGLE_GTM_ID ${NEXT_PUBLIC_GOOGLE_GTM_ID}
ARG NEXT_PUBLIC_ZENDESK_CHAT_KEY
ENV NEXT_PUBLIC_ZENDESK_CHAT_KEY ${NEXT_PUBLIC_ZENDESK_CHAT_KEY}

ARG SITE_URL
ENV SITE_URL ${SITE_URL}

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# was hitting memory limit during build with default heap size
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN chown -R nextjs:nodejs ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
