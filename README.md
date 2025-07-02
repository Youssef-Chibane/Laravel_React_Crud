# Laravel + React Blog Admin

This is a simple blog admin dashboard built with **Laravel**, **Inertia.js**, and **React** using the new starter kit [Laravel+React](https://github.com/laravel/react-starter-kit). It includes a basic CRUD interface for managing posts.

## Features

- View all posts in a table
- Create new posts
- Edit and delete existing posts
- Clean UI using [shadcn/ui](https://ui.shadcn.com/)
- SPA experience powered by Inertia.js

## Tech Stack

- Laravel (Backend)
- React + TypeScript (Frontend)
- Inertia.js
- Tailwind CSS + shadcn/ui

## Setup

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Start dev server
php artisan serve
npm run dev
```

## Screenshots

### Dashboard

![Dashboard](/public/screenshots/1.png)

### Create Post

![Create Post](/public/screenshots/2.png)

### Edit Post

![Edit Post](/public/screenshots/3.png)
