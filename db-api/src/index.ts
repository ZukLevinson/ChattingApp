import express, { Application, Request, Response } from "express";
import "./config";

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

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
