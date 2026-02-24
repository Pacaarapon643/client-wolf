# =============================================================================
# Stage 1: Builder
# =============================================================================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (leverage Docker layer cache)
# Copy only package manifests so this layer is only re-built when deps change
COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the Vite production bundle
# Pass any required public environment variables as build args:
# e.g. ARG VITE_API_URL and then ENV VITE_API_URL=$VITE_API_URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# =============================================================================
# Stage 2: Nginx runner (production)
# =============================================================================
FROM nginx:1.27-alpine AS runner

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx runs in the foreground
CMD ["nginx", "-g", "daemon off;"]
