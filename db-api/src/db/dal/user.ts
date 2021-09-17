import User, { UserInput } from "../models/User";

export async function create(payload: UserInput) {
  const newUser = new User(payload);

  return await newUser.save();
}

export async function update(userId: number, updatedPayload: UserInput) {
  return await User.update(updatedPayload, { where: { userId } });
}

export async function findByPk(userId: number) {
  return await User.findByPk(userId);
}

export async function destroy(userId: number) {
  return await User.destroy({ where: { userId } });
}

export async function findAllByUserId(userId: number) {
  return await User.findAll({
    where: {
      userId,
    },
  });
}

export async function findAllByGroupId(groupId: number) {
  return await User.findAll({
    where: {
      groupId,
    },
  });
}

export async function findAllByUserIdAndGroupId(
  userId: number,
  groupId: number
) {
  return await User.findAll({
    where: { userId, groupId },
  });
}

export async function findAll() {
  return await User.findAll();
}
