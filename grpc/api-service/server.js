
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const pkgDef = protoLoader.loadSync("../image.proto");
const proto = grpc.loadPackageDefinition(pkgDef);

const client = new proto.ImageClassifier(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.UploadImage({ imageData: Buffer.from("test") }, (err, res) => {
  if (!err) console.log("API received:", res);
});
