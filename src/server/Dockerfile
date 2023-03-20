#FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine-arm64v8 AS base
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["JJSWare/JJSWare.csproj", "JJSWare/"]
RUN dotnet restore "JJSWare/JJSWare.csproj"
COPY . .
WORKDIR "/src/JJSWare"
RUN dotnet build "JJSWare.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JJSWare.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JJSWare.dll"]