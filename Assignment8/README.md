# Assignment 8 – Express + MongoDB REST API

**Course:** INFO 6150 – Web Design & User Experience Engineering  
**Student:** Nikhil Kachhela  
**NUID:** 002039300

This submission implements a Users API with:
- Users CRUD (Create, Read, Update, Delete)
- Login endpoint (simple success by default; enable JWT via `USE_JWT=true`)
- Avatar image upload (Multer: JPG/PNG/WEBP ≤ 2MB)
- Input validation (Joi)
- Swagger docs at `/api/docs`
- Postman collection under `/postman`

## Run Locally
```bash
npm i
cp .env.example .env
# update MONGO_URI if needed
npm run dev
