# Production Dockerfile for Accenture DSA Practice Arena
# Includes Node.js (v20), Python 3, and OpenJDK (javac & JVM)

FROM node:20-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# Install Python 3, python-is-python3 symlink, and OpenJDK headless
RUN mkdir -p /usr/share/man/man1 && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        python-is-python3 \
        default-jdk-headless \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy application files
COPY . .

# Set environment
ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["node", "server.js"]

