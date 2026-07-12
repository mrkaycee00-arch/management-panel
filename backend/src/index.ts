import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRouter from "./auth";
import usersRouter from "./users";
import productsRouter from "./products";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.get("/api/health", (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Backend listening on", port));
