FROM --platform=linux/arm64 node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Set environment variable to skip optional native dependencies
ENV ROLLUP_SKIP_OPTIONAL=true

RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM --platform=linux/arm64 node:22-alpine
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
CMD [ "node", "build" ]
