import express, { Express, Request, Response } from "express";
const app: Express = express();

app.get("/api", (req: Request, res: Response) => {
  console.log(req);
  res.json({
    users: ["userOne", "lets see it baby"],
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
