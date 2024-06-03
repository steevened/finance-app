import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import auth from "./auth";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
