import express, { Application, Request, Response } from "express";
import "./config";

import * as userServices from "./db/services/UserServices";

import dbInit from "./db/init";
import userRouter from "./routes/userRoute";
import statusRouter from "./routes/statusRoute";
import groupsRouter from "./routes/groupRoute";
import messagesRouter from "./routes/messageRoute";

dbInit();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/statuses", statusRouter);
app.use("/groups", groupsRouter);
app.use("/messages", messagesRouter);

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
