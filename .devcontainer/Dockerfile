ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

ARG NODE_VERSION="22"
RUN umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} && corepack enable
