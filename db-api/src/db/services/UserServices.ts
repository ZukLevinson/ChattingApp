import { UserInput } from "../models/User";
import * as userDal from "../dal/user";
import { rejects } from "assert";
import { UserNotFound } from "../../errors/UserErrors";

export async function createUser(payload: UserInput) {
  return await userDal.create(payload);
}

export async function updateUser(userId: number, updatedPayload: UserInput) {
  const allegedUserToBeUpdated = await userDal.findByPk(userId);

  if (allegedUserToBeUpdated)
    return await userDal.update(userId, updatedPayload);
  else throw new UserNotFound();
}
