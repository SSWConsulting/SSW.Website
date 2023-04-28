ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

ARG NODE_VERSION="20"
RUN umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} && corepack enable

# RUN apt-get clean -y \
# && rm -rf /var/lib/apt/lists/* /tmp/library-scripts \
# && apt-get update \
# && apt-get -y install --no-install-recommends git
