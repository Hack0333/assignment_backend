# Assignment Management System - Backend

A backend API for managing tasks and assignments between admins and users, built with **Node.js**, **Express**, and **MongoDB**. This system handles **authentication** using JWT, **task uploads**, **status updates**, and **admin management**.

---

## Features
- **JWT-based Authentication**: Secure user authentication with JSON Web Tokens.
- **Admin Management**: List and manage admins.
- **Assignment Upload**: Users can upload tasks and link them to admins.
- **Assignment Status Updates**: Admins can accept tasks with real-time status updates.
- **Secure Cookies**: HTTP-only and same-site cookies to prevent XSS and CSRF attacks.

---

## Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose for ORM)  
- **Authentication**: JSON Web Tokens (JWT)  
- **Security**: HTTP-only cookies, CSRF protection

---
## Installation and Setup

Follow these steps to run the project locally:

### 1. Clone the Repository
```
git clone https://github.com/Hack0333/assignment_backend.git

cd assignment_backend
```
### 2. Install dependencies

```
npm install
```
### 3. Setup .env file
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
```
### 4. Run the app
```
npm start
```



