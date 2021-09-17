import { DataTypes, Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Group from "./Group";
import GroupRole from "./GroupRole";
import User from "./User";

interface UserInGroupAttributes {
  userId: number;
  groupId: number;
  roleId: number;
}
export interface UserInGroupInput
  extends Optional<UserInGroupAttributes, never> {}
export interface UserInGroupOuput extends Required<UserInGroupAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class UserInGroup extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => Group)
  @Column
  groupId!: number;

  @BelongsTo(() => Group)
  public group!: Group;

  @ForeignKey(() => GroupRole)
  @Column
  public roleId!: number;

  @BelongsTo(() => GroupRole)
  public role!: GroupRole;
}

export default UserInGroup;
