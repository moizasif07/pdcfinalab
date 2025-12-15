import express from "express";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { z } from "zod";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");


import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const t = initTRPC.create();



const PROTO_PATH = path.join(process.cwd(), "../grpc/proto/image.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj: any = grpc.loadPackageDefinition(packageDef);
const image = grpcObj.image;

const grpcClient = new image.ImageClassifier(
  "localhost:50051",
  grpc.credentials.createInsecure()
);


const appRouter = t.router({
  uploadImage: t.procedure
    .input(z.any()) // simulated image
    .mutation(() => {
      return new Promise((resolve, reject) => {
        grpcClient.ClassifyImage(
          { image: Buffer.from("dummy") },
          (err: any, response: any) => {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });
    })
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
