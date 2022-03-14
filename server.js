// server.js
const express = require("express"); // instance express
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilders");
const wilderController = require("./controllers/wildersController");
const cors = require('cors');

const app = express();

// database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    autoIndex: true,
  })

  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilders/create", wilderController.create);
app.get("/api/wilders/", wilderController.read);
app.post("/api/wilders/:id/update", wilderController.update);
app.delete("/api/wilders/:id/delete", wilderController.delete);

//Start Server
app.listen(5000, () => console.log("Server started on 5000"));
