
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const pkgDef = protoLoader.loadSync("../image.proto");
const proto = grpc.loadPackageDefinition(pkgDef);

function UploadImage(call, callback) {
  callback(null, { label: "dog", confidence: 0.95 });
}

const server = new grpc.Server();
server.addService(proto.ImageClassifier.service, { UploadImage });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Model service running on 50051");
});
