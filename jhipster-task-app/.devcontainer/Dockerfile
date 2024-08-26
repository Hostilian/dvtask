# Use the official VS Code Java Dev Container with Java 17
FROM mcr.microsoft.com/vscode/devcontainers/java:0-17

# Install Maven
ARG MAVEN_VERSION="3.8.4"
RUN apt-get update && apt-get install -y maven \
    && mvn --version

# Install Node.js and npm
ARG NODE_VERSION="18"
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update && apt-get install -y nodejs \
    && npm install -g npm@latest

# Verify installations
RUN java -version && mvn --version && node --version && npm --version

# Set environment variables
ENV NODE_HOME=/usr
ENV PATH=$NODE_HOME/bin:$PATH
ENV NODE_PATH /usr/lib/node_modules
ENV NPM_CONFIG_PREFIX /usr/local

# Install JHipster globally
RUN npm install -g generator-jhipster

# Set the working directory
WORKDIR /workspace/app

# Copy the entire project directory into the container
COPY . .

# Ensure the Maven wrapper is executable and present
RUN chmod +x mvnw
RUN mkdir -p .mvn/wrapper
RUN if [ ! -f ".mvn/wrapper/maven-wrapper.jar" ]; then \
    curl -o .mvn/wrapper/maven-wrapper.jar https://repo.maven.apache.org/maven2/org/apache/maven/maven-wrapper/3.1.0/maven-wrapper-3.1.0.jar; \
    fi
RUN echo "distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.8.4/apache-maven-3.8.4-bin.zip" > .mvn/wrapper/maven-wrapper.properties

# Install npm dependencies
RUN npm ci --legacy-peer-deps --no-audit || npm install --legacy-peer-deps --no-audit

# Build the application
RUN ./mvnw clean package -DskipTests -Pdev

# Expose port 8080
EXPOSE 8080

# Set the startup command
CMD ["java", "-jar", "target/*.jar"]
