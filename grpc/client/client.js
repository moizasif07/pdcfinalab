const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "../proto/image.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const image = grpcObj.image;

const client = new image.ImageClassifier(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const start = Date.now();

client.ClassifyImage({ image: Buffer.from("dummy") }, (err, response) => {
  const end = Date.now();
  if (err) return console.error(err);

  console.log("Direct gRPC response:", response);
  console.log("Direct gRPC time:", end - start, "ms");
});
