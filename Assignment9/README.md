Assignment 9 – React Job Portal

This project implements a React-based Job Portal that meets all requirements listed in Assignment 9. It integrates with Assignment 8’s Node.js/Express/MongoDB backend for authentication and uses Material UI, React Router, and Axios for the frontend.

✅ Features Implemented
1. Login Using Assignment 8 Credentials

Users log in using their email + password stored in the Assignment 8 MongoDB database.

The login page sends a request to POST /user/login on the backend.

Successful login stores the user’s session in localStorage.

2. Session Management

User session is stored in sessionEmail (and optional JWT token).

Protected routes redirect unauthenticated users to the login page.

3. Five Routed Pages

The app includes all required pages, each routed using react-router-dom:

Home

About

Job Listings

Contact

Company Showcase (Login required)

4. Job Listings (Frontend Data)

Displays job posts using a predefined jobPosts array.

Uses Material UI Cards and Grid for UI.

5. Company Showcase (Backend Images)

Fetches user images directly from Assignment 8’s /user/getAll endpoint.

Displays images in a gallery format using Material UI.

6. Material UI Components

Used across pages:

AppBar

Cards

Typography

Buttons

Grid

Paper

TextField

Stack
and more.

7. Axios for API Requests

Axios instance configured with VITE_API_BASE_URL.

Auto-attaches JWT token if present (future use for Assignment 10).

🚀 Project Setup
1. Start Assignment 8 Backend

Make sure the backend is running:

cd assignment8-backend
npm install
npm run dev


Default backend URL:

http://localhost:3000


If your backend runs somewhere else, create a .env file in Assignment 9:

VITE_API_BASE_URL=http://your-backend-url

2. Start Assignment 9 Frontend

Inside the frontend folder:

npm install
npm run dev


Then visit:

http://localhost:5173

🔐 Login Instructions

First create a user in Assignment 8 via Postman:

POST /user/create
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "password": "Password@123"
}


Open Assignment 9 and log in with:

Email: the email created above

Password: the password used above

Successful login will redirect you to /companies.

📁 Folder Structure Overview
src/
 ├── api/axios.js
 ├── components/
 │     ├── NavBar.jsx
 │     └── ProtectedRoute.jsx
 ├── pages/
 │     ├── Home.jsx
 │     ├── About.jsx
 │     ├── Jobs.jsx
 │     ├── Contact.jsx
 │     ├── Companies.jsx
 │     └── Login.jsx
 ├── data/jobPosts.js
 ├── App.jsx
 └── main.jsx

📝 What This Assignment Demonstrates

React routing & multi-page UI

Protected routes & session logic

Integration with external backend APIs

Material UI layout and components

Axios handling and API abstraction

Rendering dynamic UI using frontend data and backend data