import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { json } from "body-parser";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";
import { verifyToken } from "./middleware/auth";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", verifyToken, productsRouter);

app.get("/api/health", (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Backend listening on", port));
