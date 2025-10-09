# Cycle2U Backend Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Install SQLite native dependencies
RUN apt-get update && apt-get install -y libsqlite3-dev

# Copy csproj and restore as distinct layers
COPY Cycle2U.csproj .
RUN dotnet restore Cycle2U.csproj

# Copy everything else and build
COPY . .
WORKDIR /src

# Restore local tools
RUN dotnet tool restore

# Run database migrations
RUN dotnet ef database update --project Cycle2U.csproj

RUN dotnet publish Cycle2U.csproj -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "Cycle2U.dll"]
