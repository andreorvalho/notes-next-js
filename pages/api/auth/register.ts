import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Password validation function (using regex)
function validatePassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // Validate password strength
    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and symbols.",
      });
    }

    // Hash the valid password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create new user with the hashed password
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
