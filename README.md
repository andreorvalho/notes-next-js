# Full Next.js + Prisma App

This is a guide for setting up a simple **Next.js** application with **Prisma** for database management. The app includes basic user functionality, such as listing and adding users.

## Table of Contents

- [Installation](#installation)
- [Prisma Setup](#prisma-setup)
- [Seeding Database](#seeding-database)
- [API Routes](#api-routes)
- [UI Implementation](#ui-implementation)
- [Git Setup](#git-setup)
- [Running the App](#running-the-app)
- [Deploying](#deploying)

## Installation

To get started, you'll need to install the following dependencies:

```bash
npm install next react react-dom @prisma/client @next/font tailwindcss postcss autoprefixer
```

## 2. Database Setup

Create the database in postgres:

```bash
psql postgres
```

```sql
CREATE DATABASE magicbook;
CREATE USER magicbook_admin WITH PASSWORD 'magicbook_password';
ALTER USER magicbook_admin CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE magicbook TO magicbook_admin;
```

Run the following command to initialize Prisma:

```bash
npx prisma init
echo DATABASE_URL="postgresql://magicbook_admin:magicbook_password@localhost:5432/magicbook?schema=public" > .env
```

Add this code to prisma/schema.prisma
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Run migrations

```bash
npx npx prisma migrate dev --name init
```

/* Full Next.js + Prisma App */

// 1. Install dependencies:
// npm install next react react-dom @prisma/client @next/font tailwindcss postcss autoprefixer

// 2. Initialize Prisma:
// npx prisma init

// 3. Create Prisma Schema (prisma/schema.prisma)
// model User {
//   id    Int    @id @default(autoincrement())
//   name  String
//   email String @unique
// }

// 4. Run migrations:
// npx prisma migrate dev --name init

// 5. Seed Database (prisma/seed.ts):
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   await prisma.user.createMany({
//     data: [
//       { name: "John Doe", email: "john@example.com" },
//       { name: "Jane Doe", email: "jane@example.com" }
//     ]
//   });
// }
// main().catch(console.error).finally(() => prisma.$disconnect());

// 6. Run: npx prisma db seed

// 7. Create API routes (pages/api/users.ts)
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const users = await prisma.user.findMany();
//     return res.json(users);
//   }
//   if (req.method === "POST") {
//     const { name, email } = req.body;
//     const newUser = await prisma.user.create({ data: { name, email } });
//     return res.status(201).json(newUser);
//   }
// }

// 8. Create UI (pages/index.tsx)
// import { useState, useEffect } from "react";
// export default function Home() {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     fetch("/api/users").then((res) => res.json()).then(setUsers);
//   }, []);
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold">User List</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name} ({user.email})</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// 9. Initialize Git Repository:
// git init
// git add .
// git commit -m "Initial commit"
// git branch -M main
// git remote add origin <your-repo-url>
// git push -u origin main

// 10. Start Server:
// npm run dev

// 11. Deploy Frontend on Vercel and Database on Railway/Supabase
