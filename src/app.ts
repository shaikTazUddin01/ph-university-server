import express, { NextFunction, Request, Response } from "express";
import { StudentRoutes } from "./student/student.route";
import cors from "cors";
import { userRouters } from "./user/user.router";
import globalErrorHandler from "./middlewares/globalErrorhandler";

const app = express();
app.use(express.json());
app.use(cors());

//application routes

app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", userRouters);

app.use("", (req: Request, res: Response) => {
  res.send("server is connceting");
});

app.use(globalErrorHandler)

export default app;
