# Restaurant-By-Vova

Full‑stack restaurant management project consisting of a **.NET API
backend** and a **React + TypeScript frontend**.

## 📦 Project Structure

    /
    ├─ RestaurantAPI/        # ASP.NET backend API
    ├─ RestaurantWeb/        # React + TypeScript frontend (Vite)
    ├─ dump-neondb-202603011540.sql   # Database dump
    ├─ 1.Install Ubuntu WSL.txt       # Notes for installing WSL / Ubuntu

## 🚀 Technologies

### Backend

-   ASP.NET
-   C#
-   Entity Framework
-   REST API

### Frontend

-   React
-   TypeScript
-   Vite
-   TailwindCSS
-   Redux Toolkit

### Other

-   Docker (frontend container)
-   PostgreSQL / Neon database

------------------------------------------------------------------------

# ⚙️ Installation

## 1. Clone repository

``` bash
git clone https://github.com/BloodyRoom/Restaurant-By-Vova.git
cd Restaurant-By-Vova
```

------------------------------------------------------------------------

# 🖥 Backend Setup

1.  Go to API folder

``` bash
cd RestaurantAPI
```

2.  Restore dependencies

``` bash
dotnet restore
```

3.  Run API

``` bash
dotnet run
```

API usually runs on:

    http://localhost:5215

Swagger (if enabled):

    http://localhost:5215/swagger

------------------------------------------------------------------------

# 🌐 Frontend Setup

1.  Go to frontend folder

``` bash
cd RestaurantWeb
```

2.  Install dependencies

``` bash
npm install
```

3.  Run development server

``` bash
npm run dev
```

Frontend will start on:

    http://localhost:5173

Make sure `.env` contains:

    VITE_API_URL=http://localhost:5215

------------------------------------------------------------------------

# 🗄 Database

Import the SQL dump:

    dump-neondb-202603011540.sql

Example for PostgreSQL:

``` bash
psql -U postgres -d restaurant_db -f dump-neondb-202603011540.sql
```

------------------------------------------------------------------------

# 🐳 Docker (Frontend)

Build image:

``` bash
docker build -t restaurant-web ./RestaurantWeb
```

Run container:

``` bash
docker run -p 80:80 restaurant-web
```
