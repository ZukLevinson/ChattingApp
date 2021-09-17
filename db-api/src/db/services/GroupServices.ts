import * as groupDAL from "../dal/group";
import * as userDAL from "../dal/user";
import GroupRole from "../models/GroupRole";

export async function createGroup(
  userId: number,
  groupName: string,
  groupDescription?: string
) {
  return await groupDAL.create({
    creatorId: userId,
    groupName,
    groupDescription,
  });
}

export async function findAllGroupsByUserId(userId: number) {
  return await groupDAL.findAllByUserId(userId);
}

export async function findAllGroups() {
  return await groupDAL.findAll();
}

export async function findGroupByPk(groupId: number) {
  return await groupDAL.findByPk(groupId);
}
