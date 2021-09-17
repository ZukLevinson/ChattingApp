import { Request, Response, Router } from "express";

import {
  findAllMessagesByGroupId,
  createMessage,
} from "../db/services/MessageServices";

const userRouter = Router();

userRouter.get("/group/:groupId", async (req: Request, res: Response) => {
  res.json(await findAllMessagesByGroupId(parseInt(req.body.groupId)));
});

userRouter.post("/", async (req: Request, res: Response) => {
  res.json(
    await createMessage(req.body.userId, req.body.content, req.body.groupId)
  );
});

export default userRouter;
