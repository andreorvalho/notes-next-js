import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Doe", email: "jane@example.com" },
    ],
  });
  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
