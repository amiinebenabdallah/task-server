# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"] 