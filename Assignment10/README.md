# 📘 README.md — Assignment 10: Admin & Employee Portal with Redux

## INFO6150 – Web Design & User Experience Engineering
### Assignment 10: Admin & Employee Portal with Redux
**Student:** Nikhil Kachhela  
**Northeastern University**

---

## 📌 Overview

Assignment 10 enhances the existing application by adding:

- **Role-based authentication** (Admin / Employee)
- **Redux Toolkit** for global state management
- **Admin portal** with employee management + job creation
- **Employee portal** with job listings
- **Protected routes** using React Router
- **Material UI UI components**

This project builds on the backend and frontend created in Assignments 8 & 9.

---

## 🚀 Features Implemented

### 🛠 Backend Enhancements

✔ Added new `type` field in `POST /user/create`  
✔ Allowed only `"admin"` or `"employee"` values  
✔ Rejection of invalid type values  
✔ New `GET /users` endpoint (returns **all users without passwords**)  
✔ New Job APIs:
- `POST /create/job`
- `GET /jobs`

✔ Updated login controller to return:
- `token`
- `user.fullName`
- `user.email`
- `user.type` ← used for role-based routing

---

## 🖥 Frontend Enhancements (React + Redux)

### Role-Based Routing
- Admin can access:
  - `/admin/employees`
  - `/add-job`
- Employee can access:
  - `/jobs`
- All users must login

### Admin Portal
- View all users (name, email, type)
- Create new job postings

### Employee Portal
- View all available jobs
- Displayed in Material UI Cards

### Redux Toolkit Used For
- Authentication state
- Users list
- Jobs list + Job creation

---

## 🧩 Tech Stack Used

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Joi Validation  

### Frontend
- React  
- Redux Toolkit  
- React Router  
- Material UI  
- Axios  

---

## 📁 Project Structure

```
Assignment10/
├── backend/
│   ├── app.js
│   ├── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── authController.js
│   │   └── jobController.js
│   └── routes/
│       ├── userRoutes.js
│       ├── authRoutes.js
│       └── jobRoutes.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api/
        ├── store.js
        ├── features/
        ├── pages/
        └── components/
```

---

## 🧪 API Endpoints

### User Management
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/user/create` | Create new user with type |
| GET | `/api/user/users` | Get users (no password) |
| POST | `/api/auth/login` | Login and get JWT |

### Job Management
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/create/job` | Create a new job |
| GET | `/api/jobs` | Fetch all jobs |

---

## 🔐 Protected Routes

| Route | Role |
|--------|--------|
| `/admin/employees` | Admin |
| `/add-job` | Admin |
| `/jobs` | Employee |

---

## 📦 How to Run the Project

### Backend
```bash
cd Assignment10/backend
npm install
npm start
```

Backend runs at:

```
http://localhost:3000
```

### Frontend
```bash
cd Assignment10/frontend
npm install
npm run dev   # Vite
# or
npm start     # CRA
```

---

## 🔗 GitHub Repository Link

Paste your final repo link here:

```
https://github.com/nikhilkachhela/INFO6150-Assignments
```

---

## 📤 Canvas Submission

Upload:

✔ ZIP of Assignment10 folder  
✔ GitHub link  
✔ Ensure timestamps match Canvas rules  

---

## ⭐ Acknowledgements

This project follows the Assignment 10 rubric from INFO6150 and Redux concepts from Lecture 10.

