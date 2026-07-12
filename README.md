# Management Panel - Enhanced Version

A full-featured management panel with React frontend, Express backend, PostgreSQL database, and role-based access control.

## Features

### Backend
- **Express.js + TypeScript** - RESTful API server
- **PostgreSQL + Prisma** - Type-safe database ORM
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access Control (RBAC)** - Admin and User roles
- **bcryptjs** - Secure password hashing
- **Docker support** - Easy deployment

### Frontend
- **React + TypeScript + Vite** - Modern, fast frontend
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Authentication Context** - Global auth state
- **Protected Routes** - Private and Admin-only pages

## Quick Start with Docker

```bash
# Clone and setup
git clone <repo-url>
cd management-panel

# Start all services
docker-compose up --build

# Access:
# - Frontend: http://localhost:5173
# - Backend API: http://localhost:4000/api
# - Database: localhost:5432
```

## Quick Start Local Development

### Backend Setup
```bash
cd backend
npm install

# Setup database (ensure PostgreSQL is running)
export DATABASE_URL="postgresql://panel_user:panel_password@localhost:5432/management_panel"

# Run migrations and seed data
npm run prisma:migrate
npx prisma db seed

# Start backend
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Demo Credentials

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`
- Permissions: User management, role assignment, full access

**Regular User:**
- Email: `user@example.com`
- Password: `user123`
- Permissions: View profile, manage own products

## API Endpoints

### Authentication (No auth required)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Auth required, Admin-only for most)
- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user profile
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (self or admin)
- `DELETE /api/users/:id` - Delete user (admin only)

### Products (Auth required)
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product (owner or admin)
- `DELETE /api/products/:id` - Delete product (owner or admin)

## Frontend Pages

- `/login` - Login page
- `/register` - User registration
- `/` - Dashboard (protected)
- `/products` - Product listing & management (protected)
- `/admin/users` - User management (admin only)
- `/profile` - User profile (protected)

## Database Schema

### User
```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  password  String
  name      String
  role      String     @default("user")  # "user" or "admin"
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  products  Product[]
}
```

### Product
```prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Float
  stock     Int
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/management_panel
JWT_SECRET=your-secret-key
PORT=4000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000/api
```

## Development

### Prisma Studio (Database GUI)
```bash
cd backend
npm run prisma:studio
```

### Run Migrations
```bash
cd backend
npm run prisma:migrate
```

### Seed Database
```bash
cd backend
npx prisma db seed
```

## Project Structure

```
management-panel/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express app setup
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT verification & role checks
│   │   └── routes/
│   │       ├── auth.ts           # Login/Register endpoints
│   │       ├── users.ts          # User management endpoints
│   │       └── products.ts       # Product management endpoints
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── migrations/           # Database migrations
│   │   └── seed.ts               # Seed script
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Main app with routing
│   │   ├── context/
│   │   │   └── AuthContext.tsx   # Auth state management
│   │   ├── components/
│   │   │   ├── PrivateRoute.tsx  # Protected routes
│   │   │   ├── AdminRoute.tsx    # Admin-only routes
│   │   │   └── Navigation.tsx    # Top navigation bar
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Products.tsx
│   │   │   └── AdminUsers.tsx
│   │   └── index.css
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Security Features

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Role-based access control (RBAC)
✅ Protected API routes with middleware
✅ Protected frontend routes with PrivateRoute components
✅ CORS enabled for frontend communication
✅ HTTP-only considerations (implement in production)
✅ Secure role assignment (only admins can change roles)

## Next Steps / Enhancements

- [ ] Add refresh token mechanism
- [ ] Implement password reset flow
- [ ] Add email verification
- [ ] Add pagination for large datasets
- [ ] Add search and filtering
- [ ] Implement activity logging
- [ ] Add API rate limiting
- [ ] Add comprehensive error handling
- [ ] Add unit and integration tests
- [ ] Deploy to production (AWS, Vercel, Railway, etc.)

## License

MIT
