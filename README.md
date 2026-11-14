# VectorDB(Chroma)+Keycloak demo Application and OTEL
## Prerequisites
### Embeddings
Pulling embedding model to ollama container:
```shell
docker compose up -d ollama
docker compose exec -it ollama ollama pull embeddinggemma
docker compose down
```
### DataSet
To get movie dataset, use `tools/download_dataset.sh`,
you need to have python at least version>=3.9
```shell
cd tools
sh download_dataset.sh
```
### Keycloak
Create realm=demo and create User

Create any client, example:
![client example general](docs/keycloak_client_1.png)
![client example flow](docs/keycloak_client_2.png)
## Start
```shell
docker compose up
``` 