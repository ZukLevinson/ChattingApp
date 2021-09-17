import * as groupDAL from "../dal/group";
import * as userDAL from "../dal/user";
import GroupRole from "../models/GroupRole";

export async function createGroup(
  userId: number,
  groupId: number,
  groupName: string,
  groupDescription?: string
) {
  return await groupDAL.create({
    creatorId: userId,
    groupName,
    groupDescription,
    groupId,
  });
}

export async function findAllGroupsByUserId(userId: number) {
  return await groupDAL.findAllByUserId(userId);
}

export async function findByPk(groupId: number) {
  return await groupDAL.findByPk(groupId);
}
