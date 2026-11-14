#!/bin/bash
if [ -f ../src/main/resources/movies.json ]; then
    rm ../src/main/resources/movies.json
fi
curl -L -o ./the-movies-dataset.zip https://www.kaggle.com/api/v1/datasets/download/rounakbanik/the-movies-dataset
unzip -q ./the-movies-dataset.zip -d ../src/main/resources/
rm the-movies-dataset.zip
python3 read_and_send.py
rm ../src/main/resources/*.csv