import { Request, Response, Router } from "express";

import { findCurrentStatus, createStatus } from "../db/services/StatusServices";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  res.json(
    await createStatus(req.body.userId, req.body.status, req.body.groupId)
  );
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  res.json(await findCurrentStatus(parseInt(req.params.id)));
});

export default userRouter;
