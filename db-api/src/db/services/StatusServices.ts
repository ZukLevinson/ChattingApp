import { Statuses } from "../models/StatusUpdate";
import * as statusUpdateDAL from "../dal/statusUpdate";

export async function createStatus(
  userId: number,
  status: Statuses,
  groupId?: number
) {
  return await statusUpdateDAL.create({
    userId,
    status,
    groupId,
  });
}

export async function findCurrentStatus(userId: number) {
  return await statusUpdateDAL.findLatestByUserId(userId);
}
