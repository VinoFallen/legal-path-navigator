# db/load_graph_data.py

import json
from mongo import graphs_collection

def load_graph_data():
    # Open your JSON file
    with open("data/legal_graphs.json", "r") as f:
        graph_data = json.load(f)

    # Clear old data first (optional but safe)
    graphs_collection.delete_many({})

    # Insert all graphs
    graphs_collection.insert_many(graph_data)

    print("✅ Legal graphs loaded into MongoDB successfully!")

if __name__ == "__main__":
    load_graph_data()
