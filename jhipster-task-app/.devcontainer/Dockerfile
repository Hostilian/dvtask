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
# Install Node.js and npm
ARG NODE_VERSION="20.15.0"
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest
# Verify Node.js and npm installation
RUN node --version && npm --version
# Set NODE_HOME environment variable for Maven plugin
ENV NODE_HOME=/usr
ENV PATH=$NODE_HOME/bin:$PATH
# Install JHipster
RUN npm install -g generator-jhipster
# Install additional tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git curl
# Set the working directory
WORKDIR /workspace/app
# Copy the application
COPY . .
# Ensure mvnw is present and executable
RUN if [ ! -f "mvnw" ]; then \
    curl -o mvnw https://raw.githubusercontent.com/takari/maven-wrapper/master/mvnw && \
    chmod +x mvnw; \
    else \
    chmod +x mvnw; \
    fi
# Ensure .mvn directory exists
RUN mkdir -p .mvn/wrapper
# Download maven-wrapper.jar if it doesn't exist
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.jar" ]; then \
    curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar; \
    fi
# Download maven-wrapper.properties if it doesn't exist
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.properties" ]; then \
    curl -o .mvn/wrapper/maven-wrapper.properties https://raw.githubusercontent.com/takari/maven-wrapper/master/maven-wrapper.properties; \
    fi
# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    if [ -f package.json ]; then \
        npm install; \
    fi
# Run npm audit fix if package.json exists
RUN if [ -f package.json ]; then \
    npm audit fix || true; \
    fi
# Expose the port the app runs on
EXPOSE 8080
# Start the application
CMD ["./mvnw", "spring-boot:run"]
