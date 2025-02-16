import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { name: any; email: any; }; }, res: { json: (arg0: { id: number; name: string; email: string; }[]) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { id: number; name: string; email: string; }): any; new(): any; }; }; }) {
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
