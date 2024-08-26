# Use the official VS Code Java Dev Container with Java 17 to match the Java version needed
ARG VARIANT="17"
FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# Install Maven, necessary for building the application
ARG INSTALL_MAVEN="true"
ARG MAVEN_VERSION="3.8.4"

# Optionally, you can install Gradle if needed (set to false by default)
ARG INSTALL_GRADLE="false"
ARG GRADLE_VERSION=""

# Ensure the correct version of Java is installed and show the version
RUN java -version

# Conditionally install Maven and optionally Gradle
RUN if [ "${INSTALL_MAVEN}" = "true" ]; then \
        apt-get update && apt-get install -y maven \
        && mvn --version; \
    fi \
    && if [ "${INSTALL_GRADLE}" = "true" ]; then \
        apt-get update && apt-get install -y gradle \
        && gradle --version; \
    fi

# Install Node.js and npm for any front-end dependencies or build tools
ARG NODE_VERSION="18.x"
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - \
    && apt-get update && apt-get install -y nodejs \
    && npm install -g npm@latest

# Verify Node.js and npm installation
RUN node --version && npm --version

# Set NODE_HOME environment variable for use with Maven front-end plugin, and update PATH
ENV NODE_HOME="/usr"
ENV PATH="$NODE_HOME/bin:$PATH"
ENV NODE_PATH="/usr/lib/node_modules"
ENV NPM_CONFIG_PREFIX="/usr/local"

# Install JHipster globally, might be used for generating or managing the project
RUN npm install -g generator-jhipster

# Install essential tools like Git and Curl
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends git curl

# Set the working directory inside the container to /workspace/app
WORKDIR /workspace/app

# Copy the entire project directory into the container
COPY . .

# List the contents of the current directory to verify copy
RUN ls -la

# Ensure the Maven wrapper is executable
RUN chmod +x mvnw

# Ensure the .mvn directory is present
RUN mkdir -p .mvn/wrapper

# Download the Maven wrapper jar if it's not already present
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.jar" ]; then \
        curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/org/apache/maven/maven-wrapper/3.1.0/maven-wrapper-3.1.0.jar; \
    fi

# Download or update the Maven wrapper properties file
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.properties" ]; then \
        echo "distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/${MAVEN_VERSION}/apache-maven-${MAVEN_VERSION}-bin.zip" > .mvn/wrapper/maven-wrapper.properties; \
    fi

# Clear npm cache and install dependencies using npm ci for cleaner installs
RUN npm cache clean --force \
    && (npm ci --legacy-peer-deps --no-audit || npm install --legacy-peer-deps --no-audit)

# Expose port 8080 which the application uses
EXPOSE 8080

# Build the application without running tests to speed up the build process in development
RUN ./mvnw clean package -DskipTests -Pdev || (echo "Maven build failed" && exit 1)

# List the contents of the target directory to verify the build
RUN ls -la target

# Command to run the application, uses shell form to handle wildcards properly
CMD ["sh", "-c", "java -jar target/*.jar"]
