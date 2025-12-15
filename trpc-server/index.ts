import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

const t = initTRPC.create();

// Dummy AI model
const dummyModel = () => ({
  label: "cat",
  confidence: 0.93
});

const appRouter = t.router({
  uploadImage: t.procedure
    .input(z.any()) // simulated image
    .mutation(() => dummyModel())
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter
  })
);

app.listen(4000, () => {
  console.log("tRPC server running on port 4000");
});

export type AppRouter = typeof appRouter;
