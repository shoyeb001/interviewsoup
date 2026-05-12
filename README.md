# Interview Platform Backend

A production-oriented modular monolith backend for a live coding interview platform.

Features:
- Email/password authentication
- OTP verification
- JWT authentication
- Interview scheduling
- Email invitation system
- Realtime collaboration (upcoming)
- WebRTC video interviews (upcoming)
- Dockerized code execution (upcoming)

---

# Tech Stack

## Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Redis
- Socket.io
- Docker

---

# Project Architecture

- Modular Monolith
- Singleton Infrastructure Services
- Service/Repository Pattern
- Dockerized Environment
- Raw PostgreSQL Queries
- Redis Caching

---

# Running Project

## Start Containers

```bash
docker compose up --build
```

---

# Environment Variables

Create `.env`

```env
PORT=5000

DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=interview_platform

REDIS_URL=redis://redis:6379

JWT_SECRET=supersecret

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_password
```

---

# API Base URL

```bash
http://localhost:5000/api/v1
```

---

# Authentication Module

---

# 1. Register User

## Endpoint

```http
POST /api/v1/auth/register
```

## Description

Registers a new user and sends OTP verification email.

---

## Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "INTERVIEWER"
}
```

---

## Fields

| Field      | Type   | Required | Description |
|------------|--------|-----------|-------------|
| name       | string | YES | Full name |
| email      | string | YES | Unique email |
| password   | string | YES | User password |
| role       | string | YES | INTERVIEWER or CANDIDATE |

---


---

# 2. Verify OTP

## Endpoint

```http
POST /api/v1/auth/verify-otp
```

## Description

Verifies email OTP and returns JWT token.

---

## Request Body

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| email | string | YES | User email |
| otp | string | YES | 6-digit OTP |

---


---

# 3. Resend Otp

## Endpoint

```http
POST /api/v1/auth/resend-otp
```

## Description

Resend otp.

---

## Request Body

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| email | string | YES | User email |


---


---

# 4. Login

## Endpoint

```http
POST /api/v1/auth/login
```

## Description

Authenticates verified user.

---

## Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Fields

| Field | Type | Required | Description |
|------|------|----------|-------------|
| email | string | YES | User email |
| password | string | YES | User password |

---



---



# Authentication Flow

```text
Register
→ OTP Sent to Email
→ Verify OTP
→ JWT Issued
→ Login
```

---

# Upcoming Modules

## Interview Module
- Schedule interview
- Generate room link
- Email invitation
- Agenda management
- Interview timing

---

## Realtime Module
- Live code sync
- Cursor sync
- Typing events
- Socket rooms

---

## WebRTC Module
- Video/audio interview
- Screen monitoring
- Connection handling

---

## Execution Module
- Dockerized code execution
- JS/Python execution
- Timeouts
- Memory limits

---

# Folder Structure

```text
apps/backend/src
│
├── bootstrap/
├── config/
├── core/
├── modules/
├── shared/
└── websocket/
```

---

# Docker Services

- backend
- frontend
- postgres
- redis

---

# Redis Usage

Used for:
- OTP storage
- Rate limiting
- Realtime cache

---

# PostgreSQL Usage

Used for:
- users
- interviews
- sessions
- analytics

---

# Security Features

- Password hashing
- JWT authentication
- OTP verification
- Redis TTL expiration
- SQL parameterized queries
- Docker isolation (upcoming)
