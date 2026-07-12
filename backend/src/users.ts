import { Router } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const dataDir = path.join(__dirname, "..", "data");
const usersFile = path.join(dataDir, "users.json");

function readUsers() {
  const raw = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(raw);
}
function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.get("/", (_, res) => {
  const users = readUsers();
  res.json(users.map((u: any) => ({ id: u.id, email: u.email, name: u.name, role: u.role })));
});

router.get("/:id", (req, res) => {
  const users = readUsers();
  const u = users.find((x: any) => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: "Not found" });
  res.json({ id: u.id, email: u.email, name: u.name, role: u.role });
});

router.post("/", (req, res) => {
  const users = readUsers();
  const { email, name, role, password } = req.body;
  if (users.find((u: any) => u.email === email)) {
    return res.status(400).json({ error: "Email exists" });
  }
  const id = uuidv4();
  const passwordHash = ""; // In a production app, hash the password
  const user = { id, email, name, role: role || "user", passwordHash };
  users.push(user);
  writeUsers(users);
  res.status(201).json({ id, email, name, role: user.role });
});

router.put("/:id", (req, res) => {
  const users = readUsers();
  const idx = users.findIndex((x: any) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const { name, role } = req.body;
  users[idx].name = name ?? users[idx].name;
  users[idx].role = role ?? users[idx].role;
  writeUsers(users);
  res.json({ id: users[idx].id, email: users[idx].email, name: users[idx].name, role: users[idx].role });
});

router.delete("/:id", (req, res) => {
  let users = readUsers();
  users = users.filter((x: any) => x.id !== req.params.id);
  writeUsers(users);
  res.status(204).end();
});

export default router;
