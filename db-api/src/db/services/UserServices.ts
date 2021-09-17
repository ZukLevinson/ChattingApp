import { UserInput } from "../models/User";
import * as userDal from "../dal/user";
import * as groupRoleDal from "../dal/groupRole";
import * as userInGroupDal from "../dal/userInGroup";
import { UserNotFound } from "../../errors/UserErrors";
import { GroupRoleInput } from "../models/GroupRole";
import { Statuses } from "../models/StatusUpdate";
import * as statusUpdateDAL from "../dal/statusUpdate";

export async function createUser(payload: UserInput) {
  return await userDal.create(payload);
}

export async function updateUser(userId: number, updatedPayload: UserInput) {
  const allegedUserToBeUpdated = await userDal.findByPk(userId);

  if (allegedUserToBeUpdated)
    return await userDal.update(userId, updatedPayload);
  else throw new UserNotFound();
}

export async function addUserToGroup(
  userId: number,
  groupId: number,
  role: number | GroupRoleInput
) {
  if (typeof role === "number") {
    return await userInGroupDal.create({
      userId,
      groupId,
      roleId: role,
    });
  } else {
    return await userInGroupDal.create({
      userId,
      groupId,
      roleId: (await groupRoleDal.create(role)).id as number,
    });
  }
}

export async function findUserByPk(userId: number) {
  return await userDal.findByPk(userId);
}
