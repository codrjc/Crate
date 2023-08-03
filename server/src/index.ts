import express from "express";
import bodyParser from "body-parser";
require("dotenv").config(); // Load dotenv configuration
import { getMyData } from "./getme";
import authenticationRoutes from "./routes/authentification";
import apiRoutes from "./routes/api";
import { connectToDatabase } from "./database/db";
const app = express();

app.use(express.json());

app.use(bodyParser.json());

// Use authentication routes
app.use("/", authenticationRoutes);

app.use("/api", apiRoutes);

app.get("/getMe", () => {
  getMyData();
});

connectToDatabase().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});
