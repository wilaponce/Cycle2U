# Cycle2U Backend Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY backend/Cycle2U.csproj backend/
RUN dotnet restore backend/Cycle2U.csproj

# Copy everything else and build
COPY . .
WORKDIR /src/backend

# Install dotnet-ef tool
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Run database migrations
RUN dotnet ef database update --project Cycle2U.csproj

RUN dotnet publish Cycle2U.csproj -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "Cycle2U.dll"]
