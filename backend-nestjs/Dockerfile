# Use an official Node.js runtime as a parent image
FROM node:16-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the NestJS app
COPY . .

# Build NestJS app
RUN npm run build

# ----------------------
# Production Stage
# ----------------------
FROM node:16-alpine

# Create a work directory
WORKDIR /usr/src/app

# Only copy built files & minimal config from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Reinstall only production dependencies
RUN npm install --only=production

# Expose the NestJS port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
