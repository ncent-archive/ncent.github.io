## Using Docker to run the sandbox locally

First install docker locally: https://www.docker.com/products/docker-desktop

## Run a Postgres server first

```
docker run --name ncent-postgres -e POSTGRES_PASSWORD=ncent -d postgres
```

## Build and run the sandbox docker image

```
docker build . -t ncent/ncent-sandbox
docker run --rm -p 8010:8010 --name sandbox --link ncent-postgres:ncent-postgres -it -d ncent/ncent-sandbox
```

## Access the sandbox apis

From your local machine:

```
curl http://localhost:8010/api
{"message":"Welcome to the NCNT API!"}

curl http://localhost:8010/api/wallets
[]
```

## Debugging

To view the logs of the docker container:

```
docker logs ncent-postgres
docker logs sandbox
```

## Stop the containers

```
docker rm -f sandbox
docker rm -f ncent-postgres
```
