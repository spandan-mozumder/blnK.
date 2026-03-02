# blnK. — Full-Stack E-Commerce Platform

A modern e-commerce application built with React 19, Express, MongoDB, and Stripe.

---

## Tech Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Frontend  | React 19, Vite, Tailwind CSS 4, UntitledUI, Redux Toolkit |
| Backend   | Express 5, Mongoose 9, JWT, Stripe              |
| Runtime   | Bun                                             |
| Database  | MongoDB Atlas                                   |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.1+
- MongoDB Atlas account (or local MongoDB)
- Stripe account for payment processing

### 1. Clone & Install

```bash
# Install server dependencies
cd server && bun install

# Install client dependencies
cd ../client && bun install
```

### 2. Configure Environment

**Server** — edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/blnK.
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:5173
```

**Client** — edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run

```bash
# Terminal 1 — backend
cd server && bun run dev

# Terminal 2 — frontend
cd client && bun run dev
```

- Frontend: **http://localhost:5173**
- Backend API: **http://localhost:5000/api**

---

## Project Structure

```
blnK./
├── server/                 # Express API
│   └── src/
│       ├── config/         # DB connection
│       ├── controllers/    # Route handlers
│       ├── middleware/      # Auth, validation
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API routes
│       └── index.ts        # Server entry
├── client/                 # React SPA
│   └── src/
│       ├── api/            # Axios instance
│       ├── components/     # UntitledUI components + route guards
│       ├── pages/          # Page components
│       ├── store/          # Redux slices
│       ├── providers/      # Theme & router providers
│       └── main.tsx        # App entry
```

---

## API Endpoints

### Auth
| Method | Endpoint            | Description      | Auth     |
| ------ | ------------------- | ---------------- | -------- |
| POST   | `/api/auth/register`| Register user    | Public   |
| POST   | `/api/auth/login`   | Login            | Public   |
| GET    | `/api/auth/profile` | Get profile      | Required |

### Products
| Method | Endpoint               | Description          | Auth       |
| ------ | ---------------------- | -------------------- | ---------- |
| GET    | `/api/products`        | List/search/filter   | Public     |
| GET    | `/api/products/:id`    | Get single product   | Public     |
| POST   | `/api/products`        | Create product       | Admin      |
| PUT    | `/api/products/:id`    | Update product       | Admin      |
| DELETE | `/api/products/:id`    | Delete product       | Admin      |

### Orders
| Method | Endpoint                    | Description             | Auth     |
| ------ | --------------------------- | ----------------------- | -------- |
| POST   | `/api/orders/checkout`      | Create Stripe session   | Required |
| GET    | `/api/orders/verify`        | Verify payment          | Required |
| GET    | `/api/orders/history`       | Order history           | Required |

### Admin
| Method | Endpoint               | Description          | Auth  |
| ------ | ---------------------- | -------------------- | ----- |
| GET    | `/api/admin/analytics` | Sales analytics      | Admin |
| GET    | `/api/admin/orders`    | All orders           | Admin |

---

## Features

- **User Auth** — JWT-based registration, login, role-based access
- **Product Catalog** — Search, filter by category, sort by price/date, pagination
- **Shopping Cart** — Persistent cart (localStorage), quantity management
- **Stripe Checkout** — Secure hosted payment page, webhook verification
- **Order History** — View past orders with payment status
- **Admin Dashboard** — Sales analytics, product CRUD, order management
- **Security** — Helmet, CORS, rate limiting, input validation, password hashing

---

## Creating an Admin User

```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@blnK..com","password":"admin123","adminSecret":"blnK.-admin-secret-2024"}'
```

---

## License

MIT
