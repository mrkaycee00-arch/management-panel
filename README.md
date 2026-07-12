# Management Panel (Scaffold)

This is a starter management panel scaffold:
- Frontend: React + TypeScript + Vite + Tailwind
- Backend: Node.js + Express + TypeScript (simple JSON file storage for demo)
- Dockerfiles + docker-compose
- JWT auth (demo) and example CRUD for users & products

## Quick start (local, without Docker)

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
Server runs at `http://localhost:4000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

## Or use Docker
```bash
docker-compose up --build
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health
- `GET /api/health` - API health check
