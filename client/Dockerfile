# Use node 18 alpine image
FROM node:18-alpine

# Set the NODE_OPTIONS environment variable to allow legacy OpenSSL algorithms
ENV NODE_OPTIONS=--openssl-legacy-provider

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Run the build script
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]

