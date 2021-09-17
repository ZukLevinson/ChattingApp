import UserInGroup, { UserInGroupInput } from "../models/UserInGroup";

export async function create(payload: UserInGroupInput) {
  const newUserInGroup = new UserInGroup(payload);

  return await newUserInGroup.save();
}

export async function update(roleId: number, updatedPayload: UserInGroupInput) {
  return await UserInGroup.update(updatedPayload, { where: { roleId } });
}

export async function findByPk(roleId: number) {
  return await UserInGroup.findByPk(roleId);
}

export async function destroy(roleId: number) {
  return await UserInGroup.destroy({ where: { roleId } });
}

export async function findAll() {
  return await UserInGroup.findAll();
}


export async function findAllByUserId(userId: number) {
  return await UserInGroup.findAll({
    where: {
      userId,
    },
  });
}

export async function findAllByGroupId(groupId: number) {
  return await UserInGroup.findAll({
    where: {
      groupId,
    },
  });
}

export async function findAllByUserIdAndGroupId(
  userId: number,
  groupId: number
) {
  return await UserInGroup.findAll({
    where: { userId, groupId },
  });
}