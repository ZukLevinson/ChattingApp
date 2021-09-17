import GroupRole, { GroupRoleInput } from "../models/GroupRole";

export async function create(payload: GroupRoleInput) {
  const newGroupRole = new GroupRole(payload);

  return await newGroupRole.save();
}

export async function update(roleId: number, updatedPayload: GroupRoleInput) {
  return await GroupRole.update(updatedPayload, { where: { roleId } });
}

export async function findByPk(roleId: number) {
  return await GroupRole.findByPk(roleId);
}

export async function destroy(roleId: number) {
  return await GroupRole.destroy({ where: { roleId } });
}

export async function findAll() {
  return await GroupRole.findAll();
}
