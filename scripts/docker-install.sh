#!/usr/bin/env bash

type docker > /dev/null
if [[ $? -ne 0 ]] ; then
    echo
    echo "*** CANNOT RUN: This script requires a Docker install!"
    echo
    exit 1;
fi

type createdb > /dev/null
if [[ $? -ne 0 ]] ; then
    echo
    echo "*** CANNOT RUN: This script requires Postgresql client tools!"
    echo
    exit 1;
fi

# make errors count
set -euo pipefail

CONTAINER_NAME=capri-poc-docker
PORT=5432
DB_PASSWORD=docker
DATABASE_NAME=capri-poc

docker pull ankane/pgvector

docker run --name ${CONTAINER_NAME} \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -d \
    -p ${PORT}:5432 \
    ankane/pgvector

echo -n "Giving the database a few seconds to create default DBs..."
sleep 5;

export PGPASSWORD=$DB_PASSWORD
dropdb --if-exists -h 0.0.0.0 -p ${PORT} -U postgres ${DATABASE_NAME}
createdb -h 0.0.0.0 -p ${PORT} -U postgres ${DATABASE_NAME}

echo "and now ${DATABASE_NAME} DB is ready to rock!"
