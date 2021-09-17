import Message, { MessageInput } from "../models/Message";

export async function create(payload: MessageInput) {
  const newMessage = new Message(payload);

  return await newMessage.save();
}

export async function update(messageId: number, updatedPayload: MessageInput) {
  return await Message.update(updatedPayload, { where: { messageId } });
}

export async function findByPk(messageId: number) {
  return await Message.findByPk(messageId);
}

export async function destroy(messageId: number) {
  return await Message.destroy({ where: { messageId } });
}

export async function findAll() {
  return await Message.findAll();
}

export async function findAllByUserId(userId: number) {
  return await Message.findAll({
    where: {
      userId,
    },
  });
}

export async function findAllByGroupId(
  groupId: number,
  limit?: number,
  offset?: number
) {
  return await Message.findAll({
    where: {
      groupId,
    },
    limit,
    offset,
  });
}
