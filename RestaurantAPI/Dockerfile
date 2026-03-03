FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

COPY ["RestaurantAPI/RestaurantAPI.csproj", "RestaurantAPI/"]
RUN dotnet restore "RestaurantAPI/RestaurantAPI.csproj"

COPY . .
WORKDIR /source/RestaurantAPI
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "RestaurantAPI.dll"]
