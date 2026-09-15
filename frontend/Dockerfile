# =======================================================
# Frontend Dockerfile — Vite + React + TypeScript
# =======================================================

# ---- STAGE 1: Build ----
# Use Node 20 Alpine to run Vite build
# "AS builder" so stage 2 can copy the output
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (caching trick — same as backend)
COPY package.json package-lock.json ./

# Install all dependencies (Vite, React, TypeScript etc)
RUN npm ci

# Copy all source code
COPY . .

# Build the React app
# Vite compiles everything into a dist/ folder:
#   dist/index.html
#   dist/assets/main-abc123.js
#   dist/assets/main-abc123.css
# These are plain static files — no Node.js needed to serve them
RUN npm run build

# ---- STAGE 2: Serve with NGINX ----
# We don't need Node.js to serve static files
# NGINX is much faster and lighter for this job
# nginx:alpine = only ~5MB base image
FROM nginx:1.26-alpine AS production

# Remove the default NGINX config
# (it serves a default welcome page — we don't want that)
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom NGINX config for serving React
# This file is defined below in the same directory
COPY nginx-frontend.conf /etc/nginx/conf.d/app.conf

# Copy the built React app from builder stage
# dist/ contains index.html + all JS/CSS/assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Container listens on port 80
EXPOSE 80

# Health check — checks if NGINX is serving the page
# Uses 127.0.0.1 explicitly: nginx's "listen 80" only binds IPv4, but
# "localhost" can resolve to the IPv6 loopback first inside the
# container, which wget can't connect to and the check would always
# fail even though the server is up.
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1

# Start NGINX in foreground
# "daemon off" = stay in foreground so Docker knows the container is running
# If NGINX forks to background, Docker thinks the process ended and stops the container
CMD ["nginx", "-g", "daemon off;"]