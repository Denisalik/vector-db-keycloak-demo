default:
    @just --list

# show recipe for example 'just show lint'
show name:
    @just --show {{name}}

start:
    docker-compose build
    docker-compose up

docker-ollama-start:
    docker compose up -d ollama
docker-ollama-pull:
    docker compose exec -it ollama ollama pull embeddinggemma

docker-download-dataset:
    cd tools && sh download_dataset.sh
    @just start
