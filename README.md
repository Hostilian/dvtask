```
*  _____         _    __  __                                   
 |_   _|_ _ ___| | _|  \/  | __ _ _ __   __ _  __ _  ___ _ __ 
   | |/ _` / __| |/ / |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|
   | | (_| \__ \   <| |  | | (_| | | | | (_| | (_| |  __/ |   
   |_|\__,_|___/_|\_\_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|   
                                              |___/           

*
   🚀 Welcome to the TaskManager App! 🚀

                                                    

                   Powered by JHipster 8.6.0

  _    _ _       _     _              ____             _             
 | |  | (_)     (_)   | |            |  _ \           | |            
 | |__| |_ _ __  _ ___| |_ ___ _ __  | |_) | ___  __ _| |_ ___ _ __  
 |  __  | | '_ \| / __| __/ _ \ '__| |  _ < / _ \/ _` | __/ _ \ '_ \ 
 | |  | | | |_) | \__ \ ||  __/ |    | |_) |  __/ (_| | ||  __/ | | |
 |_|  |_|_| .__/|_|___/\__\___|_|    |____/ \___|\__,_|\__\___|_| |_|
          | |                                                        
          |_|    og hipster
                                                     
   https://hub.docker.com/repository/docker/watashiwa19/dvtsk/general

Quick Start:
------------
1. Set up your environment:
   ```
   winget install Schniz.fnm
   fnm env --use-on-cd | Out-String | Invoke-Expression
   fnm use --install-if-missing 20
   node -v  # Should show v20.16.0
   npm -v   # Should show 10.8.1
   ```

2. Launch the app:
   ```
   npm install
   npm start
   ./mvnw spring-boot:run
   ```

Development Workflow:
---------------------
🧙‍♂️ Backend:  ./mvnw
🧙‍♀️ Frontend: ./npmw start

Production Build:
-----------------
🏭 Build:    ./mvnw -Pprod clean verify
🚀 Launch:   java -jar target/*.jar

Docker Magic:
-------------
🐳 Build image:  ./mvnw -Pprod verify jib:dockerBuild
🌊 Run with Docker Compose:
   docker-compose -f src/main/docker/app.yml up -d

Testing:
--------
🧪 All tests:     ./mvnw verify
🔬 Frontend tests: ./npmw test

Continuous Integration:
-----------------------
🔄 Push to 'main' branch
🚀 GitHub Actions will automatically:
   - Build the application
   - Run tests
   - Create and push Docker image to Docker Hub

Docker Hub Repository:
----------------------
🐋 Repository: watashiwa19/dvtsk
🔗 Link: https://hub.docker.com/repository/docker/watashiwa19/dvtsk/general

To pull the latest image:
```
docker pull watashiwa19/dvtsk:latest
```

Project Structure:
------------------
/src/main/java - Backend Java code
/src/main/resources - Configuration files
/src/main/webapp - Frontend Angular code
/src/test - Test files

Key Files:
----------
pom.xml - Maven configuration
package.json - npm dependencies
.yo-rc.json - JHipster configuration
.github/workflows/ci-cd.yml - CI/CD pipeline configuration

Additional Information:
-----------------------
- This project uses JHipster 8.6.0
- Frontend: Angular with TypeScript
- Backend: Spring Boot
- Database: H2 (dev), PostgreSQL (prod)
- Authentication: JWT

Useful Commands:
----------------
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev,api-docs
./mvnw clean verify -Pprod
./npmw run webapp:prod

For more detailed information, visit:
https://www.jhipster.tech/documentation-archive/v8.6.0

Happy coding, brave developer! May your tasks be managed efficiently! 🎉
```
