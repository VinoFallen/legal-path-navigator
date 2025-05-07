# services/graph_service.py

from db.mongo import graphs_collection

def get_graph_by_case_type_and_goal(case_type: str, goal: str):
    graph_document = graphs_collection.find_one({"case_type": case_type}, {"_id": 0})
    if not graph_document:
        return None
    graphs = graph_document.get("graphs", {})
    return graphs.get(goal)  # returns the correct path for goal
