# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install Expo CLI and app dependencies
RUN npm install expo-cli
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Expo uses
EXPOSE 8080 19000 19001 19002

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Start the Expo development server with network access
CMD ["npm", "start", "--", "--port", "8080", "--lan"]