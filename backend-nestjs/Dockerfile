# Use an official Node.js runtime as a parent image for building
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build

# ----------------------
# Production Stage
# ----------------------
FROM node:18-alpine AS production

# Create a work directory
WORKDIR /usr/src/app

# Only copy necessary files from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the NestJS port
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start:prod"]

# ----------------------
# Development Stage
# ----------------------
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "start:dev"]
