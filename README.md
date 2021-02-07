## Run local image
````shell
docker build -f Dockerfile . -t  nova/nova-web
docker run -p 4201:80  --name nova-web nova/nova-web:latest
````

## Run cloud image
````shell
docker build -f Dockerfile.cloud . -t  nova/nova-web-cloud
docker run -p 4202:80  --name nova-web-cloud nova/nova-web-cloud:latest
````
