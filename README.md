# 🔐 Serverlit

**Serverlit** is a plug-and-play authentication server built with **Express.js**.  
It takes away the hassle of setting up an auth server every time you start a new project.

Whether you're building a small app or a large-scale platform, Serverlit helps you get started with secure authentication in minutes.

## 📂 Project Structure

```
├── src/
│   ├── routes/          # Auth routes
│   ├── controllers/     # Logic for signup, signin, etc.
│   ├── middlewares/     # JWT validation, error handling
│   ├── services/        # Business logic (tokens, hashing, etc.)
│   ├── utils/           # Helper functions
│   └── index.ts/js      # App entry point
├── tests/               # Test files
├── .env.example         # Example environment variables
├── package.json
└── README.md
```

## ⚡ Features

- 🔑 **User authentication** with JWT
- 🛡️ **Password hashing** with bcrypt
- 📜 **Token refresh** support
- ⚙️ **Configurable via environment variables**
- 🧩 **Easily extendable** (add routes, integrate with your DB)

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Auth:** JWT + bcrypt
- **Validation:** Zod / Joi
- **Database:** MongoDB (default, but pluggable)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Esavwede/serverlit.git
cd serverlit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` → `.env` and update values:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/serverlit
JWT_SECRET=supersecretkey
REFRESH_TOKEN_SECRET=refreshsecret
TOKEN_EXPIRES_IN=1h
```

### 4. Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

Server will be running at:  
👉 `http://localhost:5000`

---

## 📖 API Endpoints

### Base URL

```
http://localhost:5000/api/v1
```

### 🔑 Auth Routes

#### Signup

```http
POST /auth/signup
```

**Body**

```json
{
  "email": "user@example.com",
  "password": "strongpassword123"
}
```

## 🧪 Testing

```bash
npm test
```

## 📦 Deployment

Serverlit can be deployed anywhere:

- **Docker** → `docker build -t serverlit .`
- **Render/Heroku/Vercel** → push repo & set env variables

## 👥 Contributing

Contributions are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push and open a PR

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
