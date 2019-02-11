#! /bin/bash
yarn build:server
docker build -t server:1.0.0 . -f Dockerfile.server 
docker tag server:1.0.0 registry.heroku.com/homeaider-server/web
docker push registry.heroku.com/homeaider-server/web
heroku container:release  web --app=homeaider-server