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
    && apt-get -y install --no-install-recommends git curl

# Set the working directory
WORKDIR /workspace/app

# Copy the application
COPY . .

# Download mvnw if it doesn't exist
RUN if [ ! -f "mvnw" ]; then \
    curl -o mvnw https://raw.githubusercontent.com/takari/maven-wrapper/master/mvnw && \
    chmod +x mvnw; \
    else \
    chmod +x mvnw; \
    fi

# Download .mvn directory if it doesn't exist
RUN if [ ! -d ".mvn" ]; then \
    mkdir -p .mvn/wrapper && \
    curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar && \
    curl -o .mvn/wrapper/maven-wrapper.properties https://raw.githubusercontent.com/takari/maven-wrapper/master/maven-wrapper.properties; \
    fi

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["./mvnw", "spring-boot:run"]
