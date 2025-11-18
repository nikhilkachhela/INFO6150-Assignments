# Assignment 8 – Express + MongoDB REST API

Course: INFO 6150 – Web Design & User Experience Engineering  
Student: Nikhil Kachhela  
NUID: 002039300

## 📋 Overview

This project implements a comprehensive RESTful API for user management with secure authentication and image upload capabilities. Built with Node.js, Express, and MongoDB, it demonstrates industry-standard practices for API development including input validation, password security, and comprehensive documentation.

## ✨ Features Implemented

### Core Functionality
✅ User CRUD Operations
- Create new users with validation
- Update user details (name and/or password)
- Delete users by email
- Retrieve all users with hashed passwords

✅ Security Features
- bcrypt password hashing (10 salt rounds)
- Strong password validation (8+ chars, uppercase, lowercase, digit, special char)
- Email uniqueness enforcement
- Input sanitization with Joi

✅ Image Upload System
- Single image per user restriction
- Format validation (JPEG, PNG, GIF only)
- File size limit (2MB maximum)
- Secure storage in `/images` directory

✅ API Documentation
- Complete Swagger/OpenAPI 3.0 specification
- Interactive documentation at `/api/docs`
- Detailed request/response examples

✅ Testing Suite
- 15 comprehensive Postman test cases
- Covers all endpoints and error scenarios
- Automated test assertions

## 🚀 Quick Start

### Prerequisites
```bash
Node.js v16 or higher
MongoDB (local installation or Atlas cluster)
npm or yarn package manager
```

### Installation Steps

1. Clone and Navigate
```bash
git clone <your-repository-url>
cd assignment8-express-api
```

2. Install Dependencies
```bash
npm install
```

3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/assignment8
PORT=3000
NODE_ENV=development
```

4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

5. Verify Installation
- API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs
- Health Check: http://localhost:3000/

## 📡 API Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| POST | `/user/create` | Create new user | 201, 400 |
| PUT | `/user/edit` | Update user details | 200, 400, 404 |
| DELETE | `/user/delete` | Delete user by email | 200, 404 |
| GET | `/user/getAll` | Get all users | 200 |
| POST | `/user/uploadImage` | Upload user image | 201, 400, 404 |

### Detailed Endpoint Documentation

#### 1. Create User
POST `/user/create`

Request Body:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "Str0ng@Pass"
}
```

Success Response (201):
```json
{
  "message": "User created successfully."
}
```

Error Response (400):
```json
{
  "error": "Validation failed."
}
```

#### 2. Update User
PUT `/user/edit`

Request Body:
```json
{
  "email": "john.doe@example.com",
  "fullName": "John Smith",
  "password": "NewStr0ng@Pass"
}
```

Success Response (200):
```json
{
  "message": "User updated successfully."
}
```

#### 3. Delete User
DELETE `/user/delete`

Request Body:
```json
{
  "email": "john.doe@example.com"
}
```

Success Response (200):
```json
{
  "message": "User deleted successfully."
}
```

#### 4. Get All Users
GET `/user/getAll`

Success Response (200):
```json
{
  "users": [
    {
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "password": "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
    }
  ]
}
```

#### 5. Upload Image
POST `/user/uploadImage`

Request: multipart/form-data
- `email`: john.doe@example.com (text)
- `image`: [file] (JPEG/PNG/GIF, max 2MB)

Success Response (201):
```json
{
  "message": "Image uploaded successfully.",
  "filePath": "/images/user-1234567890-123456789.jpg"
}
```

## 🔒 Validation Rules

### Full Name
- Pattern: Alphabetic characters and spaces only
- Length: 2-60 characters
- Examples: 
  - ✅ "John Doe"
  - ✅ "Mary Jane Watson"
  - ❌ "John123" (contains numbers)
  - ❌ "J" (too short)

### Email
- Format: Valid email address
- Uniqueness: Must be unique in database
- Examples:
  - ✅ "john.doe@example.com"
  - ✅ "user@domain.co.uk"
  - ❌ "invalid-email" (invalid format)
  - ❌ "existing@email.com" (duplicate)

### Password
- Minimum Length: 8 characters
- Required Characters:
  - At least 1 uppercase letter (A-Z)
  - At least 1 lowercase letter (a-z)
  - At least 1 digit (0-9)
  - At least 1 special character (!@#$%^&*, etc.)
- Examples:
  - ✅ "Str0ng@Pass"
  - ✅ "MyP@ssw0rd"
  - ❌ "password" (no uppercase, digit, or special char)
  - ❌ "Pass123" (no special character)
  - ❌ "Short1!" (too short)

### Image Upload
- Formats: JPEG, PNG, GIF only
- Size Limit: 2MB maximum
- Quantity: One image per user
- Storage: `/images` directory

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Click Import button
3. Select `Assignment8.postman_collection.json`
4. Collection will appear in left sidebar

### Test Sequence
Run tests in this order for best results:

1. Create User - Creates test user
2. Create User - Invalid Email - Tests validation
3. Create User - Weak Password - Tests password rules
4. Create User - Invalid Name - Tests name validation
5. Get All Users - Verifies user creation
6. Edit User - Update Name - Tests name update
7. Edit User - Update Password - Tests password update
8. Edit User - Both Fields - Tests complete update
9. Edit User - Not Found - Tests 404 handling
10. Upload Image - Success - Tests image upload
11. Upload Image - User Not Found - Tests 404
12. Upload Image - Already Exists - Tests duplicate prevention
13. Delete User - Success - Tests deletion
14. Delete User - Not Found - Tests 404
15. Health Check - Verifies API status

### Automated Tests
Each request includes automated test scripts that verify:
- Correct HTTP status codes
- Expected response structure
- Proper error messages

## 📁 Project Structure

```
assignment8-express-api/
├── config/
│   └── db.js                          # MongoDB connection setup
├── controllers/
│   └── userController.js              # Business logic & request handlers
├── middleware/
│   └── upload.js                      # Multer configuration for file uploads
├── models/
│   └── User.js                        # Mongoose schema definition
├── routes/
│   └── userRoutes.js                  # API route definitions
├── docs/
│   └── swagger.json                   # OpenAPI 3.0 specification
├── images/                            # Uploaded user images (auto-created)
├── postman/
│   └── Assignment8.postman_collection.json
├── .env                               # Environment variables (not in git)
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
├── app.js                             # Application entry point
├── package.json                       # Dependencies & scripts
├── package-lock.json                  # Dependency lock file
└── README.md                          # This file
```

## 🛠 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | Runtime environment |
| Express | 4.19.2 | Web framework |
| MongoDB | Latest | Database |
| Mongoose | 8.6.3 | ODM for MongoDB |
| bcryptjs | 2.4.3 | Password hashing |
| Joi | 17.13.3 | Schema validation |
| Multer | 1.4.5 | File upload handling |
| Swagger UI Express | 5.0.1 | API documentation |
| dotenv | 16.4.5 | Environment variables |
| cors | 2.8.5 | Cross-origin resource sharing |
| morgan | 1.10.0 | HTTP request logger |

## 🔐 Security Implementation

### Password Security
- Hashing Algorithm: bcrypt with 10 salt rounds
- Password Requirements: Enforced via regex validation
- Storage: Only hashed passwords stored in database
- Never Logged: Passwords never appear in logs

### Input Validation
- Schema Validation: Joi library for all inputs
- Email Validation: RFC 5322 compliant
- SQL Injection Prevention: Mongoose parameterized queries
- XSS Prevention: Input sanitization

### File Upload Security
- Type Validation: Mimetype checking
- Size Limiting: 2MB maximum per file
- Filename Sanitization: Unique, timestamped filenames
- Directory Isolation: Uploads contained in `/images`

## ⚠️ Error Handling

All endpoints return standardized error responses:

### Common Errors

Validation Failed (400)
```json
{
  "error": "Validation failed."
}
```

User Not Found (404)
```json
{
  "error": "User not found."
}
```

Image Already Exists (400)
```json
{
  "error": "Image already exists for this user."
}
```

Invalid File Format (400)
```json
{
  "error": "Invalid file format. Only JPEG, PNG, and GIF are allowed."
}
```

Server Error (500)
```json
{
  "error": "Server error"
}
```

## 📊 Response Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (create/upload) |
| 400 | Bad Request | Validation failure, duplicate data |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server error |

## 🎯 Testing Checklist

### Functionality Tests
- ✅ Create user with valid data
- ✅ Create user with invalid email format
- ✅ Create user with weak password
- ✅ Create user with invalid name (numbers/symbols)
- ✅ Attempt to create duplicate user
- ✅ Retrieve all users successfully
- ✅ Update user name only
- ✅ Update user password only
- ✅ Update both name and password
- ✅ Attempt to update non-existent user
- ✅ Upload valid image file
- ✅ Upload image for non-existent user
- ✅ Attempt to upload duplicate image
- ✅ Delete existing user
- ✅ Attempt to delete non-existent user

### Security Tests
- ✅ Passwords are hashed in database
- ✅ Strong password rules enforced
- ✅ Email uniqueness enforced
- ✅ Invalid file types rejected
- ✅ File size limits enforced

### Edge Cases
- ✅ Empty request body handling
- ✅ Missing required fields
- ✅ Extra fields in request (ignored)
- ✅ Special characters in names
- ✅ Very long input strings

## 🚧 Known Limitations

1. Single Image Per User: Design choice - users can only have one profile image
2. Immutable Email: Email addresses cannot be changed (used as unique identifier)
3. Local Storage: Images stored locally (not cloud storage like S3)
4. No Authentication: No JWT/session management (basic CRUD implementation)
5. No Rate Limiting: API can be called unlimited times

## 🔮 Future Enhancements

### Planned Features
- [ ] JWT authentication with refresh tokens
- [ ] Role-based access control (admin/user)
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Image compression and optimization
- [ ] Cloud storage integration (AWS S3, Cloudinary)
- [ ] Rate limiting and request throttling
- [ ] API versioning
- [ ] Pagination for user lists
- [ ] Advanced search and filtering
- [ ] User profile completion tracking
- [ ] Activity logging and audit trails

## 📝 Environment Variables

Required variables in `.env`:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/assignment8
# or MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/assignment8

# Server Configuration
PORT=3000
NODE_ENV=development

# Optional: JWT Secret (for future auth implementation)
# JWT_SECRET=your-super-secret-key-here
```

## 🐛 Troubleshooting

### Common Issues

MongoDB Connection Failed
```bash
Error: Mongo connection error
```
Solution: 
- Verify MongoDB is running: `mongod --version`
- Check MONGO_URI in `.env` file
- For Atlas: Whitelist your IP address

Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
Solution:
- Change PORT in `.env` file
- Kill process using port: `lsof -ti:3000 | xargs kill`

Multer File Upload Error
```bash
Error: ENOENT: no such file or directory
```
Solution:
- Images directory will be auto-created
- Check write permissions on project folder

Module Not Found
```bash
Error: Cannot find module 'express'
```
Solution:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 API Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:3000/api/docs
```

Features:
- Try out API calls directly from browser
- See request/response schemas
- View example payloads
- Understand validation rules

### Postman Documentation
Import the collection for:
- Pre-configured requests
- Environment variables
- Automated test scripts
- Request history

## 🎓 Assignment Requirements Met

### ✅ Core Requirements (100%)
- [x] User creation with validation
- [x] Update user details (name/password)
- [x] Delete user by email
- [x] Retrieve all users
- [x] Image upload with validation
- [x] bcrypt password hashing
- [x] Joi input validation
- [x] Proper HTTP status codes
- [x] Error messages match specifications
- [x] Swagger documentation
- [x] Postman collection with tests

### ✅ Additional Features
- [x] Comprehensive README
- [x] Clean, modular code structure
- [x] Environment variable configuration
- [x] Automated test assertions
- [x] CORS support
- [x] Request logging (morgan)
- [x] Health check endpoint

## 📄 License

This project is created for educational purposes as part of the INFO 6150 course at Northeastern University.

## 👤 Author

Nikhil Kachhela
- NUID: 002039300
- Course: INFO 6150 - Web Design & User Experience Engineering
- Assignment: Assignment 8 - RESTful APIs with Node.js & MongoDB

## 📞 Support

For questions or issues:
1. Check Swagger documentation at `/api/docs`
2. Review Postman collection examples
3. Verify MongoDB connection
4. Check server console logs
5. Contact instructor or TA

---

Last Updated: November 2024  
API Version: 1.0.0  
Documentation Version: 1.0.0
