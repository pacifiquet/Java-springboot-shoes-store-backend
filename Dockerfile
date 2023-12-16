# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR store/app

# Copy only the POM file first to take advantage of Docker layer caching
COPY pom.xml .

# Download and cache the Maven dependencies
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)


# Stage 2: Create the production image
FROM eclipse-temurin:17-jre-alpine

VOLUME /tmp

ARG DEPENDENCY=store/app/target/dependency

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /store/app/lib

COPY --from=build ${DEPENDENCY}/META-INF /store/app/META-INF

COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /store/app

RUN addgroup -S demo && adduser -S demo -G demo

USER demo
EXPOSE 8081

ENTRYPOINT ["java","-cp","/store/app:/store/app/lib/*","com.store.ShoesStoreBackendApplication"]