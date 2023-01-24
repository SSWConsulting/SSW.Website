# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile


# Rebuild the source code only when needed
FROM node:16-alpine AS builder

# Build requires some environment variables -> source them as build args
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ENV NEXT_PUBLIC_TINA_CLIENT_ID ${NEXT_PUBLIC_TINA_CLIENT_ID}

ARG TINA_TOKEN
ENV TINA_TOKEN ${TINA_TOKEN}

ARG NEXT_PUBLIC_TINA_BRANCH
ENV NEXT_PUBLIC_TINA_BRANCH ${NEXT_PUBLIC_TINA_BRANCH}

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
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS ${NEXT_PUBLIC_GOOGLE_ANALYTICS}
ARG NEXT_PUBLIC_HOTJAR_ID
ENV NEXT_PUBLIC_HOTJAR_ID ${NEXT_PUBLIC_HOTJAR_ID}
ARG NEXT_PUBLIC_HOTJAR_SV
ENV NEXT_PUBLIC_HOTJAR_SV ${NEXT_PUBLIC_HOTJAR_SV}
ARG NEXT_PUBLIC_ZENDESK_CHAT_KEY
ENV NEXT_PUBLIC_ZENDESK_CHAT_KEY ${NEXT_PUBLIC_ZENDESK_CHAT_KEY}

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]