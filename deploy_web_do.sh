#! /bin/bash
docker build -t web:1.0.0 . -f Dockerfile.web 
docker tag web:1.0.0 registry.heroku.com/homeaider/web
docker push registry.heroku.com/homeaider/web
heroku container:release  web --app=homeaider