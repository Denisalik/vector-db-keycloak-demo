import csv
import ast
import json

def show_types(dicts: dict[str, dict]):
    col_types = {}
    for row in dicts.values():
        for key, value in row.items():
            col_types.setdefault(key, set()).add(type(value))
    for col, types in col_types.items():
        print(col, types)

path = "../src/main/resources/"
file = "movies_metadata.csv"
records = {}
with open(path+file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        row_dict = {}
        row_dict['originalTitle'] = row['original_title']
        row_dict['id'] = row['id']
        row_dict['overview'] = row['overview']
        row_dict['voteAverageScore'] = row['vote_average']#can be null
        records[row['id']] = row_dict

file = "keywords.csv"
with open(path+file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        keywords = ast.literal_eval(row['keywords'])
        records[row['id']]['keywords'] = [keyword['name'] for keyword in keywords]

file = "movies.json"
with open(path+file, "w", encoding="utf-8") as f:
    json.dump(records, f)