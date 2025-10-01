# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Clean npm cache and install only production dependencies
RUN npm cache clean --force && npm install --production

# Copy the rest of the frontend code
COPY . .

# Build the frontend (Next.js)
RUN npm run build

# Expose port (Next.js default)
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]