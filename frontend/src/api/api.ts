// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // ✅ FastAPI port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
