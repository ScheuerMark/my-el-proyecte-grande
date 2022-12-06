#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 7021
ENV ASPNETCORE_URLS=http://*:7021

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./Forum/Forum.csproj", "."]
RUN dotnet restore "Forum.csproj"

COPY ["./Forum", "."]

RUN dotnet build "Forum.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Forum.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Forum.dll"]