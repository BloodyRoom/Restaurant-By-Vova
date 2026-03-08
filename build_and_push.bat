@echo off

echo Docker login...
docker login

REM ==== WEB ====
cd RestaurantWeb
docker build -t u-vovy --build-arg VITE_API_URL=https://u-vovy.itstep.click .
docker tag u-vovy:latest novakvova/u-vovy:latest
docker push novakvova/u-vovy:latest

REM ==== API ====
cd ..\RestaurantAPI
echo Building Docker image api...
docker build -t api-u-vovy . 
echo Tagging Docker image api...
docker tag api-u-vovy:latest novakvova/api-u-vovy:latest
echo Pushing Docker image api to repository...
docker push novakvova/api-u-vovy:latest
echo Done ---api---!
pause
 