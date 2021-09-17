import { Request, Response, Router } from "express";

import {
  findAllGroupsByUserId,
  findGroupByPk,
  createGroup,
  findAllGroups,
} from "../db/services/GroupServices";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.json(await findAllGroups());
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  res.json(await findGroupByPk(parseInt(req.params.id)));
});

userRouter.get("/user/:id", async (req: Request, res: Response) => {
  res.json(await findAllGroupsByUserId(parseInt(req.params.id)));
});

userRouter.post("/", async (req: Request, res: Response) => {
  res.json(
    await createGroup(
      req.body.userId,
      req.body.groupName,
      req.body.groupDescription
    )
  );
});

export default userRouter;
