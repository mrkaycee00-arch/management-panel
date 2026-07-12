import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin User",
      role: "admin",
    },
  });

  // Create test user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: userPassword,
      name: "Test User",
      role: "user",
    },
  });

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: "Laptop",
        price: 999.99,
        stock: 50,
        userId: admin.id,
      },
      {
        name: "Mouse",
        price: 29.99,
        stock: 200,
        userId: admin.id,
      },
      {
        name: "Keyboard",
        price: 79.99,
        stock: 150,
        userId: user.id,
      },
    ],
  });

  console.log("✅ Seed data created successfully");
  console.log("Admin credentials: admin@example.com / admin123");
  console.log("User credentials: user@example.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
