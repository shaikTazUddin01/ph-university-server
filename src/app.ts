import express, { NextFunction, Request, Response } from "express";
import { StudentRoutes } from "./modules/student/student.route";
import cors from "cors";
import { userRouters } from "./modules/user/user.router";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

//application routes

app.use("/api/v1", router);

// app.use("/", (req: Request, res: Response) => {
//   res.send("server is connceting");
// });

app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
