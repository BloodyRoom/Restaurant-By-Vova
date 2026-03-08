@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t api-u-vovy . 

echo Tagging Docker image api...
docker tag api-u-vovy:latest novakvova/api-u-vovy:latest

echo Pushing Docker image api to repository...
docker push novakvova/api-u-vovy:latest

echo Done ---api---!
pause
 