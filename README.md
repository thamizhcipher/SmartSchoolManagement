# 📊 Smart School Management System

A full-stack ERP system designed for schools and educational institutions.

---

## 🚀 Features

- Role-based access (`admin`, `teacher`, `student`)
- RESTful Rails API with a responsive React frontend
- Tailwind CSS for modern UI styling
- PostgreSQL as the local database
- Add and update courses and events

---

## 🧱 Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | React + Tailwind CSS   |
| Backend     | Ruby on Rails (API)    |
| Database    | PostgreSQL (local)     |

---

## 📂 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/thamizhcipher/SmartSchoolManagement.git
cd SmartSchoolManagement
```
### 2. Backend Setup (Rails API)
```bash
bundle install
rails db:create db:migrate
```
Note: You may need to update the config/database.yml file to match your PostgreSQL username and password

### 3. Frontend Setup (React + Tailwind CSS)
```bash
cd client
npm install
npm start
```
### 🔐 User Roles Overview
- Admin: Full control over users 
- Teacher: Manage and view courses 
- Student: View course and events
- Admin Login : check@123.com check@123
