import requests

GEMINI_API_KEY = "AIzaSyCXSYXAspFfENOilDo7hqL4yD7QPPG8tQM"
GEMINI_ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

headers = {
    "Content-Type": "application/json"
}

def extract_legal_info(user_complaint):
    prompt = f"""You are an expert legal assistant tasked with outlining potential procedural paths for resolving legal cases.

A user has submitted the following legal complaint:
\"\"\"{user_complaint}\"\"\"

From the complaint, infer the legal case type and then identify and describe the sequential steps involved in four distinct strategies: "low_cost", "fast_resolution", "high_efficiency", and "low_risk". Represent each strategy as a graph where the steps are nodes and the transitions between steps are edges. Each edge should include an estimated time in days, the associated cost in Indian Rupees (₹), and a qualitative risk level (e.g., "low", "medium", "high").

The final output MUST be a JSON object with the following structure:

```json
[
  {{
    "case_type": "<INSERT_CASE_TYPE>",
    "graphs": {{
      "low_cost": {{
        "nodes": ["<STEP_1>", "<STEP_2>", ...],
        "edges": [
          {{"from": "<STEP_1>", "to": "<STEP_2>", "time_days": <INTEGER>, "cost_rupees": <INTEGER>, "risk_level": "<STRING>"}}
        ]
      }},
      "fast_resolution": {{
        "nodes": ["<STEP_A>", "<STEP_B>", ...],
        "edges": [
          {{"from": "<STEP_A>", "to": "<STEP_B>", "time_days": <INTEGER>, "cost_rupees": <INTEGER>, "risk_level": "<STRING>"}}
        ]
      }},
      "high_efficiency": {{
        "nodes": ["<STEP_X>", "<STEP_Y>", ...],
        "edges": [
          {{"from": "<STEP_X>", "to": "<STEP_Y>", "time_days": <INTEGER>, "cost_rupees": <INTEGER>, "risk_level": "<STRING>"}}
        ]
      }},
      "low_risk": {{
        "nodes": ["<STEP_P>", "<STEP_Q>", ...],
        "edges": [
          {{"from": "<STEP_P>", "to": "<STEP_Q>", "time_days": <INTEGER>, "cost_rupees": <INTEGER>, "risk_level": "<STRING>"}}
        ]
      }}
    }}
  }}
]
```"""

    data = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    response = requests.post(GEMINI_ENDPOINT, headers=headers, json=data)

    try:
        result = response.json()
        output = result["candidates"][0]["content"]["parts"][0]["text"]
        return output
    except KeyError:
        return {"error": "Unexpected API response", "response": result}

