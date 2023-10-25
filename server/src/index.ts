import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config();
import { getMyData } from "./getme";
import spotifyApiRoutes from "./routes/spotifyApiRoutes";
import { connectToDatabase } from "./database/db";
import router from "./routes/routes";
const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// app.use("/", apiRoutes)
app.use("/", router);
app.use("/spotify", spotifyApiRoutes);

app.get("/getMe", () => {
  getMyData();
});

connectToDatabase().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});
