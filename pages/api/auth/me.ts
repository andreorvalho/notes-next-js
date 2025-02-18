import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      // Find the user by ID from the decoded token
      const user = await prisma.user.findUnique({
        where: { id: (decoded as any).userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return the user's information
      res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
