# path: routers/query_router.py
from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_api import extract_legal_info
from db.mongo import parsed_queries_collection
from datetime import datetime
import json
import re

router = APIRouter()

# ✅ Define input model
class ComplaintInput(BaseModel):
    complaint: str

@router.post("/full")
def query_full(input: ComplaintInput):
    complaint = input.complaint.strip()

    if not complaint:
        return {"error": "Complaint text is empty."}

    # Step 1: Call extract_legal_info to get the structured data
    extracted_info_raw = extract_legal_info(complaint)
    extracted_info_clean = re.sub(r"^```json|```$", "", extracted_info_raw.strip(), flags=re.MULTILINE)

    try:
        extracted_data = json.loads(extracted_info_clean)
        if isinstance(extracted_data, list) and len(extracted_data) > 0:
            processed_data = extracted_data[0]
            case_type = processed_data.get("case_type", "")
            keywords = [] # The current prompt doesn't explicitly extract keywords
            graphs = processed_data.get("graphs", {})
        else:
            return {"error": "Unexpected format in Gemini response", "raw_response": extracted_info_raw}
    except json.JSONDecodeError as e:
        return {
            "error": "Failed to parse Gemini response",
            "raw_response": extracted_info_raw,
            "exception": str(e)
        }

    if not case_type:
        return {
            "error": "Could not determine case_type from complaint via Gemini",
            "raw_response": extracted_info_raw
        }

    # Step 2: Store the parsed query and Gemini's response
    parsed_queries_collection.insert_one({
        "complaint_text": complaint,
        "keywords": keywords,
        "case_type": case_type,
        "timestamp": datetime.utcnow(),
        "gemini_response": graphs
    })

    # Step 3: Return the extracted and structured data
    return {
        "parsed_data": {
            "keywords": keywords,
            "case_type": case_type
        },
        "graph_data": {
            "case_type": case_type,
            "graphs": graphs
        }
    }