import express, { Request, Response } from "express";

const app = express();



app.use("", (req: Request, res: Response) => {
  res.send("server is connceting");
});


export default app;