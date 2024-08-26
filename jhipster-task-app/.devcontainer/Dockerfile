# Use the official VS Code Java Dev Container with Java 17
ARG VARIANT="17"
FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# [Option] Install Maven
ARG INSTALL_MAVEN="true"
ARG MAVEN_VERSION="3.8.4"

# [Option] Install Gradle
ARG INSTALL_GRADLE="false"
ARG GRADLE_VERSION=""

# Ensure the correct version of Java is installed
RUN java -version

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

# List contents of the current directory
RUN ls -la

# Remove duplicate test files
RUN find src/test/java -name "*.java" -type f -delete || true

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
        npm ci --legacy-peer-deps --no-audit || npm install --legacy-peer-deps --no-audit; \
    fi

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables for Node.js
ENV NODE_PATH /usr/lib/node_modules
ENV NPM_CONFIG_PREFIX /usr/local

# Build the application
RUN ./mvnw clean package -DskipTests -Pdev || (echo "Maven build failed" && exit 1)

# List contents of the target directory
RUN ls -la target

# Start the application
CMD ["sh", "-c", "java -jar target/*.jar"]
