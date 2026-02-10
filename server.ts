import * as dotenv from "dotenv";
dotenv.config(); // <-- doit être tout en haut

import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = parseInt(process.env.PORT || "4500", 10);
const host = process.env.HOST || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(
      `> Server listening on http://localhost:${port} (${dev ? "dev" : "prod"})`
    );
  });
});
