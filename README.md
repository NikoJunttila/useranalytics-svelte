# Useranalytics project with go backend

The purpose of this project is to offer a free, cookie-free way to track how many users your website has and what platforms they come from.

Current work in progress: [https://analytics.junttila.dev/docs](https://analytics.junttila.dev/docs)

## Docker Support

This project supports multi-platform Docker builds (x86_64 and ARM64), making it compatible with both standard servers and Raspberry Pi devices.

### Build and Run

#### Single Platform (Local)
To build for your current architecture:
```bash
docker compose up --build
```

#### Multi-Platform (Buildx)
To build and push for both x86_64 and ARM64 simultaneously:
```bash
docker buildx build --platform linux/amd64,linux/arm64 -t your-image-name:latest --push .
```

## Environment Variables

The application can be configured via environment variables. See the `.env` file for available options and `compose.yml` for Docker configuration.
