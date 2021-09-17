import * as messageDAL from "../dal/message";

export async function createMessage(
  userId: number,
  content: string,
  groupId: number
) {
  return await messageDAL.create({
    userId,
    content,
    groupId,
  });
}

export async function findAllByGroupId(groupId: number) {
  return await messageDAL.findAllByGroupId(groupId);
}
