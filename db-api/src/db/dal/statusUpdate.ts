import StatusUpdate, { StatusUpdateInput } from "../models/StatusUpdate";

export async function create(payload: StatusUpdateInput) {
  const newStatusUpdate = new StatusUpdate(payload);

  return await newStatusUpdate.save();
}

export async function findAll() {
  return await StatusUpdate.findAll();
}

export async function findAllByUserId(userId: number) {
  return await StatusUpdate.findAll({
    where: {
      userId,
    },
  });
}

export async function findLatestByUserId(userId: number) {
  return await StatusUpdate.findAll({
    where: {
      userId,
    },
    limit: 1,
    order: [["createdAt", "DESC"]],
  });
}

export async function findAllByGroupId(groupId: number) {
  return await StatusUpdate.findAll({
    where: {
      groupId,
    },
  });
}

export async function findAllByUserIdAndGroupId(
  userId: number,
  groupId: number
) {
  return await StatusUpdate.findAll({
    where: { userId, groupId },
  });
}
