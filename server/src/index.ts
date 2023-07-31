import express, { Express, Request, Response } from "express";
import mongose from "mongoose";
const app = express();
const uri =
  "mongodb+srv://admin:NLviz6x8NoTcsjvn@crateapi.bvkbzec.mongodb.net/?retryWrites=true&w=majority";

app.get("/api/user", (req, res) => {
  console.log(req);
  res.json({
    users: ["userOne", "lets see it baby"],
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
