require("dotenv-safe").config();
import { createServer } from "http";
import { parse } from "url";
import * as next from "next";

import { routes } from "./routes";

const port = parseInt(process.env.PORT as any, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url as any, true);

    handle(req, res, parsedUrl);
  }).listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
