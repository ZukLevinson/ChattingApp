import { Request, Response, Router } from "express";

import {
  findUserByPk,
  findAllUsers,
  addUserToGroup,
} from "../db/services/UserServices";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.json(await findAllUsers());
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  res.json(await findUserByPk(parseInt(req.params.id)));
});

userRouter.post(
  "/:id/addToGroup/:groupId",
  async (req: Request, res: Response) => {
    res.json(
      await addUserToGroup(
        parseInt(req.params.id),
        parseInt(req.params.groupId),
        1
      )
    );
  }
);

export default userRouter;
