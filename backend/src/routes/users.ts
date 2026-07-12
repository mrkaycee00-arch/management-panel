import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest, verifyToken, requireRole } from "../middleware/auth";
import bcrypt from "bcryptjs";

const router = Router();
const prisma = new PrismaClient();

// GET all users (admin only)
router.get("/", verifyToken, requireRole("admin"), async (req: AuthRequest, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET single user
router.get("/:id", verifyToken, async (req: AuthRequest, res) => {
  const { id } = req.params;

  // Users can only view their own profile unless they're admin
  if (req.user?.role !== "admin" && req.user?.id !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// CREATE user (admin only)
router.post("/", verifyToken, requireRole("admin"), async (req: AuthRequest, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password, and name are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "user",
      },
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// UPDATE user (admin only or self)
router.put("/:id", verifyToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  // Users can only update their own profile unless they're admin
  if (req.user?.role !== "admin" && req.user?.id !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Only admins can change roles
  if (role && req.user?.role !== "admin") {
    return res.status(403).json({ error: "Only admins can change roles" });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: name ?? undefined,
        role: role ?? undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE user (admin only)
router.delete("/:id", verifyToken, requireRole("admin"), async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
