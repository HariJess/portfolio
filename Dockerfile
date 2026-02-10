# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=24.13.0
ARG PNPM_VERSION=10.28.2

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production
ENV PORT=4500

WORKDIR /usr/src/app

# Installer pnpm
RUN npm install -g pnpm@latest

# Copier package files d'abord pour profiter du cache Docker
COPY package.json pnpm-lock.yaml* ./

# Installer toutes les dépendances (incl. dev) pour builder
RUN pnpm install --frozen-lockfile

# Copier le reste du code
COPY . .

# Builder le projet (ton script "build" doit exister)
RUN pnpm run build

# S'assurer que l'utilisateur node a la propriété des fichiers
RUN chown -R node:node /usr/src/app

# Passer à l'utilisateur non-root
USER node

EXPOSE 4500

# Lancer l'app (ou node dist/server.js si tu préfères)
CMD ["pnpm", "start"]
