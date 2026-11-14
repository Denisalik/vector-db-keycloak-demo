FROM gradle:9.8.2-jdk25 AS deps
WORKDIR /app

ENV GRADLE_USER_HOME=/var/cache/gradle

COPY build.gradle.kts settings.gradle.kts ./
RUN --mount=type=cache,id=gradle-cache,target=/var/cache/gradle gradle --no-daemon -q dependencies

FROM deps AS test
WORKDIR /app
COPY src ./src
RUN --mount=type=cache,id=gradle-cache,target=/var/cache/gradle gradle --no-daemon clean check

FROM deps AS build
WORKDIR /app
COPY src/main ./src/main
RUN --mount=type=cache,id=gradle-cache,target=/var/cache/gradle gradle --no-daemon -q clean bootJar -x test

FROM eclipse-temurin:25.0.4_7-jdk-jammy as prod
WORKDIR /app

RUN groupadd -r app && useradd -r -g app app
USER app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]