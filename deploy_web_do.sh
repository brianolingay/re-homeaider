#! /bin/bash
yarn build:web
docker build -t web:1.0.1 . -f Dockerfile.web 
docker tag web:1.0.1 registry.heroku.com/homeaider-web/web
docker push registry.heroku.com/homeaider-web/web
heroku container:release  web --app=homeaider-web