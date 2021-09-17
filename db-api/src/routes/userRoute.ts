import { Request, Response, Router } from "express";

import { findUserByPk, findAllUsers } from "../db/services/UserServices";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.json(await findAllUsers());
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  res.json(await findUserByPk(parseInt(req.params.id)));
});

export default userRouter;
