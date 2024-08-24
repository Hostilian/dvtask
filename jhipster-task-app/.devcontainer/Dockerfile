# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/java/.devcontainer/base.Dockerfile
ARG VARIANT="17"
FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# [Option] Install Maven
ARG INSTALL_MAVEN="true"
ARG MAVEN_VERSION="3.8.4"

# [Option] Install Gradle
ARG INSTALL_GRADLE="false"
ARG GRADLE_VERSION=""

# Install Maven and Gradle
RUN if [ "${INSTALL_MAVEN}" = "true" ]; then \
    apt-get update && apt-get install -y maven \
    && mvn --version; \
    fi \
    && if [ "${INSTALL_GRADLE}" = "true" ]; then \
    apt-get update && apt-get install -y gradle \
    && gradle --version; \
    fi

# [Choice] Node.js version: none, lts/*, 16, 14, 12, 10
ARG NODE_VERSION="16"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Install JHipster
RUN su vscode -c "npm install -g generator-jhipster"

# Install additional tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git

# Set the working directory
WORKDIR /workspace/app

# Debug: List contents of the current directory
RUN ls -la

# Copy the application
COPY . .

# Debug: List contents after copying
RUN ls -la

# Set the correct permissions for the mvnw file and verify its existence
RUN if [ -f "mvnw" ]; then chmod +x mvnw; else echo "mvnw file not found in $(pwd)"; find / -name mvnw 2>/dev/null || true; exit 1; fi

# List contents of the working directory
RUN ls -la

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["sh", "-c", "if [ -f \"mvnw\" ]; then ./mvnw spring-boot:run; else echo 'mvnw not found' && ls -la; fi"]
