import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest, requireRole } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// GET all products
router.get("/", async (req: AuthRequest, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET single product
router.get("/:id", async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// CREATE product
router.post("/", async (req: AuthRequest, res) => {
  const { name, price, stock } = req.body;
  const userId = req.user?.id;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ error: "Name, price, and stock are required" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        userId: userId!,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// UPDATE product (owner or admin)
router.put("/:id", async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Only owner or admin can update
    if (product.userId !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? undefined,
        price: price !== undefined ? parseFloat(price) : undefined,
        stock: stock !== undefined ? parseInt(stock) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE product (owner or admin)
router.delete("/:id", async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Only owner or admin can delete
    if (product.userId !== req.user?.id && req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.product.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
