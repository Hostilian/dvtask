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
    && apt-get update && apt-get install -y nodejs \
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
# Remove duplicate test files
RUN find src/test/java -name "*.java" -type f -delete
# Ensure mvnw is present and executable
RUN chmod +x mvnw
# Ensure .mvn directory exists
RUN mkdir -p .mvn/wrapper
# Download maven-wrapper.jar if it doesn't exist
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.jar" ]; then \
    curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/org/apache/maven/maven-wrapper/3.1.0/maven-wrapper-3.1.0.jar; \
    fi
# Download maven-wrapper.properties if it doesn't exist
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.properties" ]; then \
    echo "distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.8.4/apache-maven-3.8.4-bin.zip" > .mvn/wrapper/maven-wrapper.properties; \
    fi
# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    if [ -f package.json ]; then \
        npm ci; \
    fi
# Run npm audit fix if package.json exists
RUN if [ -f package.json ]; then \
    npm audit fix --force || true; \
    fi
# Expose the port the app runs on
EXPOSE 8080
# Set environment variables for Node.js
ENV NODE_PATH /usr/lib/node_modules
ENV NPM_CONFIG_PREFIX /usr/local
# Build the application
RUN ./mvnw clean package -DskipTests -Pdev
# Start the application
CMD ["sh", "-c", "java -jar target/*.jar"]
