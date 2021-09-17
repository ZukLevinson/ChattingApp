import Group, { GroupInput } from "../models/Group";

export async function create(payload: GroupInput) {
  const newGroup = new Group(payload);

  return await newGroup.save();
}

export async function update(groupId: number, updatedPayload: GroupInput) {
  return await Group.update(updatedPayload, { where: { groupId } });
}

export async function findByPk(groupId: number) {
  return await Group.findByPk(groupId);
}

export async function destroy(groupId: number) {
  return await Group.destroy({ where: { groupId } });
}

export async function findAll() {
  return await Group.findAll();
}

export async function findAllByUserId(userId: number) {
  return await Group.findAll({
    where: {
      creatorId: userId,
    },
  });
}

export async function findOne(args: any) {
  return await Group.findOne({ ...args });
}
