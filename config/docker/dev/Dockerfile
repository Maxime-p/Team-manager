FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
RUN npm ci

# Copy source files
COPY . .

# Expose dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]