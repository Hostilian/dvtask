# TaskManager App

```
  _    _ _       _     _              ____             _             
 | |  | (_)     (_)   | |            |  _ \           | |            
 | |__| |_ _ __  _ ___| |_ ___ _ __  | |_) | ___  __ _| |_ ___ _ __  
 |  __  | | '_ \| / __| __/ _ \ '__| |  _ < / _ \/ _` | __/ _ \ '_ \ 
 | |  | | | |_) | \__ \ ||  __/ |    | |_) |  __/ (_| | ||  __/ | | |
 |_|  |_|_| .__/|_|___/\__\___|_|    |____/ \___|\__,_|\__\___|_| |_|
          | |                                                        
          |_|    gg hipster
```

## 🚀 Welcome to the TaskManager App! 🚀

### 🧙‍♂️ Quick Start Incantation 🧙‍♀️

1. 🪄 Summon the development environment:
   ```
   winget install Schniz.fnm
   fnm env --use-on-cd | Out-String | Invoke-Expression
   fnm use --install-if-missing 20
   node -v  # Should reveal v20.16.0
   npm -v   # Should unveil 10.8.1
   ```

2. 🎭 Bring the app to life:
   ```
   npm install
   npm start
   ./mvnw spring-boot:run
   ```

### 🏗️ Development Alchemy 🧪
- Backend Sorcery:  `./mvnw`
- Frontend Wizardry: `./npmw start`

### 🏭 Brewing for Production 🚀
- Concoct the potion:    `./mvnw -Pprod clean verify`
- Unleash the magic:     `java -jar target/*.jar`

### 🐳 Docker Enchantments 🌊
- Craft the image:  `./mvnw -Pprod verify jib:dockerBuild`
- Conjure with Docker Compose:
  ```
  docker-compose -f src/main/docker/app.yml up -d
  ```

### 🧪 Testing Rituals 🔬
- Summon all tests:     `./mvnw verify`
- Examine the frontend: `./npmw test`

### 🔄 Continuous Incantation 🚀
1. Push your spells to the 'main' branch
2. GitHub's magical familiars will automatically:
   - 🏗️ Construct the application
   - 🧪 Perform mystical tests
   - 🐳 Forge and push a Docker image to the ethereal Docker Hub

### 🐋 Docker Hub Sanctuary 🏛️
- Repository: watashiwa19/dvtsk
- Portal: [https://hub.docker.com/repository/docker/watashiwa19/dvtsk/general](https://hub.docker.com/repository/docker/watashiwa19/dvtsk/general)

To summon the latest image:
```
docker pull watashiwa19/dvtsk:latest
```

### 📁 Scroll Repository Structure 📜
- `/src/main/java` --------- Backend Java scrolls
- `/src/main/resources` --- Configuration runes
- `/src/main/webapp` ------- Frontend Angular enchantments
- `/src/test` -------------- Test incantations

### 🗝️ Key Grimoires 📚
- `pom.xml` ----------- Maven's spell book
- `package.json` ------ npm's potion ingredients
- `.yo-rc.json` ------- JHipster's secret recipes
- `.github/workflows/ci-cd.yml` - CI/CD ritual instructions

### 🧠 Arcane Knowledge 🌟
- This magical construct uses JHipster 8.6.0
- Frontend: Angular with TypeScript (for modern sorcery)
- Backend: Spring Boot (for robust enchantments)
- Database: H2 (for development scrying), PostgreSQL (for production divination)
- Authentication: JWT (for secure passage through realms)

### 🔮 Crystal Ball Commands 🔮
```
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev,api-docs
./mvnw clean verify -Pprod
./npmw run webapp:prod
```

### Unnecessary Information (scary bat)

```
 __________
< TaskMaster >
 ----------
    \
        =/\                 /\=
    / \'._   (\_/)   _.'/ \
   / .''._'--(o.o)--'_.''. \
  /.' _/ |`'=/ " \='`| \_ `.\
 /` .' `\;-,'\___/',-;/` '. '\
/.-'       `\(-V-)/`       `-.\
`            "   "            `
```

#### 🎨 Customization Spells 🖌️
- Alter the color scheme: Modify `src/main/webapp/content/scss/_bootstrap-variables.scss`
- Add new components: Use Angular CLI's generation spells
- Extend backend capabilities: Craft new Spring Boot services and controllers

#### 🛡️ Security Wards 🔒
- JWT authentication guards the gates
- Role-based access control protects the inner sanctum
- CSRF protection shields against dark magic
- XSS prevention wards off malicious scripts

#### 🌐 Internationalization Charms 🌍
- Supports multiple languages through Angular's i18n
- Add new translations in `src/main/webapp/i18n/`

#### 📈 Performance Enchantments ⚡
- Angular AOT compilation for swift frontend spells
- Spring Boot's production profile for optimized backend sorcery
- Minification and bundling of CSS and JavaScript scrolls

#### 🐞 Debugging Rituals 🔍
- Use Chrome DevTools for frontend investigations
- Employ IntelliJ IDEA's debugger for backend explorations
- Leverage Spring Boot Actuator for production insights

#### 📚 Further Studies 📖
For more arcane knowledge, consult the grand tomes at:
[https://www.jhipster.tech/documentation-archive/v8.6.0](https://www.jhipster.tech/documentation-archive/v8.6.0)

May your code be bug-free and your deployments swift! 
Happy coding, brave developer! 🎉
