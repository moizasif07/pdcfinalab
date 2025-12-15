const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "../proto/image.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef);
const image = grpcObj.image;

// Dummy AI model
function classifyImage(call, callback) {
  callback(null, {
    label: "cat",
    confidence: 0.95
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(image.ImageClassifier.service, {
    ClassifyImage: classifyImage
  });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("gRPC server running on port 50051");
      server.start();
    }
  );
}

main();
