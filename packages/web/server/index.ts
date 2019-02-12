require("dotenv-safe").config();
import { parse } from "url";
import * as next from "next";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as Redis from "ioredis";

const redis =
  process.env.NODE_ENV === "production"
    ? new Redis(process.env.REDIS_URL)
    : new Redis();

import { routes } from "./routes";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post("/tokens", (req, res) => {
    const { token, refreshToken } = req.body;

    redis.set("token", token);
    redis.set("refreshToken", refreshToken);

    res.json({ ok: true });
  });

  server.delete("/remove", (_, res) => {
    redis.del("token");
    redis.del("refreshToken");

    res.json({ ok: true });
  });

  server.get("*", async (req, res) => {
    const parsedUrl = parse(req.url, true);

    const token = await redis.get("token");
    const refreshToken = await redis.get("refreshToken");
    if (token && refreshToken) {
      req.headers["x-token"] = token;
      req.headers["x-refresh-token"] = refreshToken;
    }

    handle(req, res, parsedUrl);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
