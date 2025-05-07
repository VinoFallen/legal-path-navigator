from fastapi import FastAPI
from routers import query_full
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(query_full.router, prefix="/query")  # ✅ Only this remains

@app.get("/")
def root():
    return {"message": "Legal Path Navigator backend is live"}

origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # React default (optional)
    "http://localhost:8080",  # if frontend is served from this port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Use ["*"] for testing only (not in prod)
    allow_credentials=True,
    allow_methods=["*"],             # Allows GET, POST, PUT, DELETE, OPTIONS, etc.
    allow_headers=["*"],             # Allows custom headers
)
