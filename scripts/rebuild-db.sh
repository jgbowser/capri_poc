#!/usr/bin/env bash

# make errors count
set -euo pipefail

CONTAINER_NAME=capri-poc-docker

docker stop $CONTAINER_NAME || :;
docker rm $CONTAINER_NAME || :;

npm run docker:install;

# npm run migrate:latest;
# npm run seed;