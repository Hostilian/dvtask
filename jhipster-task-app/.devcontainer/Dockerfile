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
    && apt-get -y install --no-install-recommends git curl netcat

# Set the working directory
WORKDIR /workspace/app

# Copy the application
COPY . .

# Debug: List contents after copying
RUN echo "Contents of /workspace/app:" && ls -la

# Generate mvnw if it doesn't exist
RUN if [ ! -f "mvnw" ]; then \
        echo "mvnw not found, generating it..."; \
        mvn -N io.takari:maven:wrapper -Dmaven=3.8.4; \
    else \
        echo "mvnw found"; \
    fi

# Set the correct permissions for the mvnw file
RUN chmod +x mvnw

# Verify mvnw exists and is executable
RUN if [ -x "mvnw" ]; then \
        echo "mvnw is executable"; \
    else \
        echo "mvnw is not executable or doesn't exist"; \
        exit 1; \
    fi

# Compile the application
RUN ./mvnw clean package -DskipTests

# List contents of the working directory
RUN echo "Final contents of /workspace/app:" && ls -la

# Expose the port the app runs on
EXPOSE 8080

# Start the application with verbose logging
CMD ["sh", "-c", "echo 'Starting application...' && java -jar target/*.jar --spring.profiles.active=prod,api-docs"]
