import { Router } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const dataDir = path.join(__dirname, "..", "data");
const productsFile = path.join(dataDir, "products.json");

function readProducts() {
  const raw = fs.readFileSync(productsFile, "utf-8");
  return JSON.parse(raw);
}
function writeProducts(items: any[]) {
  fs.writeFileSync(productsFile, JSON.stringify(items, null, 2));
}

router.get("/", (_, res) => {
  res.json(readProducts());
});

router.post("/", (req, res) => {
  const products = readProducts();
  const id = uuidv4();
  const item = { id, ...req.body };
  products.push(item);
  writeProducts(products);
  res.status(201).json(item);
});

router.put("/:id", (req, res) => {
  const products = readProducts();
  const idx = products.findIndex((p: any) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  products[idx] = { ...products[idx], ...req.body };
  writeProducts(products);
  res.json(products[idx]);
});

router.delete("/:id", (req, res) => {
  let products = readProducts();
  products = products.filter((p: any) => p.id !== req.params.id);
  writeProducts(products);
  res.status(204).end();
});

export default router;
