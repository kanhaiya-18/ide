# Production Dockerfile for Accenture DSA Practice Arena
# Includes Node.js (v20), Python 3, and OpenJDK 17 (javac & JVM)

FROM node:20-bullseye-slim

# Install Python 3 and OpenJDK
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    openjdk-17-jdk-headless \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy application files
COPY . .

# Set environment
ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["node", "server.js"]
