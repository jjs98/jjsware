FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine-arm64v8 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-server
WORKDIR /src
COPY src/server/JJSWare .
RUN dotnet publish -c Release -o /app/publish

FROM arm64v8/node:18 AS pre-build-client
WORKDIR /src
RUN npm i -g pnpm
COPY src/client/package.json .
COPY src/client/pnpm-lock.yaml .
RUN pnpm install

FROM pre-build-client AS build-client
COPY src/client .
RUN pnpm build --output-path /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build-server /app/publish .
COPY --from=build-client /app/publish ./wwwroot/
ENTRYPOINT dotnet JJSWare.dll