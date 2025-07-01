<<<<<<< HEAD
# laravel
=======
# Car Wash Management System (Laravel + React)

## Overview

This project is a modern car wash management system using Laravel 9.52.20 (API backend), React (frontend), and MySQL.

## Project Structure

-   `backend/` - Laravel 9.52.20 API backend
-   `frontend/` - React (Vite) frontend

## Getting Started

### Prerequisites

-   PHP >= 8.0
-   Composer
-   Node.js & npm
-   MySQL

### Backend Setup (Laravel)

1. `cd backend`
2. Copy `.env.example` to `.env` and update your MySQL credentials.
3. Run `composer install`
4. Run `php artisan key:generate`
5. Run `php artisan migrate` to set up the database tables.
6. Start the server: `php artisan serve`

### Frontend Setup (React)

1. `cd frontend`
2. Run `npm install`
3. Start the dev server: `npm run dev`

### Connecting Frontend to Backend

-   Update the API base URL in the React app to point to your Laravel backend (e.g., `http://localhost:8000/api`).

## Features

-   User authentication & management
-   Service management
-   Job management
-   Reports & salary management

## Development

-   Backend: Build RESTful APIs in Laravel.
-   Frontend: Build UI in React, consume backend APIs.

---

For more details, see the code and comments in each folder.
>>>>>>> dd9ef57 (Initial commit)
