#!/bin/bash

docker build . -t nova/nova-web
docker tag nova/nova-web:latest registry.heroku.com/nova-web/web
docker push registry.heroku.com/nova-web/web
heroku container:release web
