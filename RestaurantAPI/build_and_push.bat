@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t restaurant-api . 

echo Tagging Docker image api...
docker tag restaurant-api:latest novakvova/restaurant-api:latest

echo Pushing Docker image api to repository...
docker push novakvova/restaurant-api:latest

echo Done ---api---!
pause
 