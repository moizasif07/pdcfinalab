import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(process.cwd(), "../grpc/proto/image.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const image = grpcObj.image;

const grpcClient = new image.ImageClassifier(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
