const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// Dummy Model Function
function dummyModel() {
  const labels = ["cat", "dog", "car"];
  return {
    label: labels[Math.floor(Math.random() * labels.length)],
    confidence: Math.random().toFixed(2)
  };
}

app.get("/", (req, res) => {
  res.send("REST API Running");
});

app.post("/uploadImage", upload.single("image"), (req, res) => {
  const result = dummyModel();
  res.json(result);
});

app.listen(3000, () => {
  console.log("REST server running on port 3000");
});
