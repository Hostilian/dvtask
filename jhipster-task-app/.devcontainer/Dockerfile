# Base Image with Java 17
ARG VARIANT="17"
FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# Optional: Install Maven and Gradle
ARG INSTALL_MAVEN="true"
ARG MAVEN_VERSION="3.8.4"
ARG INSTALL_GRADLE="false"
ARG GRADLE_VERSION=""

# Install Maven and Gradle based on arguments
RUN if [ "${INSTALL_MAVEN}" = "true" ]; then \
    apt-get update && apt-get install -y maven \
    && mvn --version; \
    fi \
    && if [ "${INSTALL_GRADLE}" = "true" ]; then \
    apt-get update && apt-get install -y gradle \
    && gradle --version; \
    fi

# Install Node.js via nvm (Node Version Manager)
ARG NODE_VERSION="18.18.0"
ENV NVM_DIR=/usr/local/nvm
RUN mkdir -p $NVM_DIR \
    && chmod -R 777 $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm use ${NODE_VERSION} \
    && nvm alias default ${NODE_VERSION}
ENV PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:${PATH}"

# Install JHipster globally
RUN npm install -g generator-jhipster@latest

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

# Ensure .mvn directory and contents are present
RUN mkdir -p .mvn/wrapper \
    && if [ ! -f ".mvn/wrapper/maven-wrapper.jar" ]; then \
    curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar; \
    fi \
    && if [ ! -f ".mvn/wrapper/maven-wrapper.properties" ]; then \
    curl -o .mvn/wrapper/maven-wrapper.properties https://raw.githubusercontent.com/takari/maven-wrapper/master/maven-wrapper.properties; \
    fi

# Install npm dependencies
RUN npm install

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["./mvnw", "spring-boot:run"]
