import express, { Application, Request, Response } from "express";
import "./config";

import * as userServices from "./db/services/UserServices";

import dbInit from "./db/init";

dbInit();

const app: Application = express();
const port = process.env.PORT || 5000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1`,
  });
});
app.get("/create", async (req: Request, res: Response): Promise<Response> => {
  return res.json(
    await userServices.createUser({
      username: "zuk",
      firstName: "zuk",
      email: "zuklevinson@gmail.com",
    })
  );
});
app.get("/update", async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.json(
      await userServices.updateUser(3, {
        username: "zuk2",
        firstName: "zuk",
        email: "zuklevinson@gmail.com",
      })
    );
  } catch (e: any) {
    console.log(e);
    return res.status(400);
  }
});

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
