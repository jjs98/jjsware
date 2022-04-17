FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine-arm64v8 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-server
WORKDIR /src
COPY src/server/JJSchmitz .
RUN dotnet publish -c Release -o /app/publish

FROM arm64v8/node AS pre-build-client
WORKDIR /src
COPY src/client/package.json .
COPY src/client/yarn.lock .
RUN yarn

FROM pre-build-client AS build-client
COPY src/client .
RUN yarn build --output-path /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build-server /app/publish .
COPY --from=build-client /app/publish ./wwwroot/
ENTRYPOINT dotnet JJSchmitz.dll