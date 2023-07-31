import express, { Express, Request, Response } from "express";
import mongose from "mongoose";
require("dotenv").config();

const app = express();

const uri: string = process.env.MONGODB_URI || ""; // Assuming MONGODB_URI is defined in your .env file

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
