import { PrismaClient } from "@prisma/client";
import { Request, Response } from "../../types";

const prisma = new PrismaClient();

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  if (req.method === "POST") {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({ data: { name, email } });
    return res.status(201).json(newUser);
  }
}
