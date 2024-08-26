# Use a base image with Java 17
FROM eclipse-temurin:17-jdk-focal

# Set environment variables
ENV NODE_VERSION=20.15.0
ENV MAVEN_VERSION=3.8.4
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Install necessary tools
RUN apt-get update && apt-get install -y curl git

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Install Maven
RUN curl -fsSL https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz | tar xzf - -C /opt/ \
    && ln -s /opt/apache-maven-${MAVEN_VERSION} /opt/maven \
    && ln -s /opt/maven/bin/mvn /usr/local/bin/mvn

# Set Maven environment variables
ENV MAVEN_HOME=/opt/maven
ENV PATH="${MAVEN_HOME}/bin:${PATH}"

# Install JHipster
RUN npm install -g generator-jhipster

# Set the working directory
WORKDIR /workspace/app

# Copy the application
COPY . .

# Remove duplicate test files
RUN find src/test/java -name "*.java" -type f -delete

# Ensure mvnw is present and executable
RUN chmod +x mvnw

# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    if [ -f package.json ]; then \
        npm ci; \
    fi

# Expose the port the app runs on
EXPOSE 8080

# Build the application
RUN ./mvnw clean package -DskipTests -Pdev

# Start the application
CMD ["sh", "-c", "java -jar target/*.jar"]
