import { Router } from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const dataDir = path.join(__dirname, "..", "data");
const usersFile = path.join(dataDir, "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

function readUsers() {
  const raw = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(raw);
}
function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const users = readUsers();
  if (users.find((u: any) => u.email === email)) {
    return res.status(400).json({ error: "Email exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email, name, role: "user", passwordHash: hash };
  users.push(user);
  writeUsers(users);
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u: any) => u.email === email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

export default router;
