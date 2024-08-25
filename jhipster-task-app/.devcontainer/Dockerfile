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

# Install Node.js and npm using nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 20.15.0

RUN mkdir -p $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Verify Node.js and npm installation
RUN node --version && npm --version

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
