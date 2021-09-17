import { DataTypes, Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import sequelizeConnection from "../config";
import Group from "./Group";
import UserInGroup from "./UsersInGroup";

interface GroupRoleAttributes {
  roleId: number;
  roleName: string;
  allowMessaging: boolean;
  allowDeletion: boolean;
  allowRemoval: boolean;
  groupId: number;
}
export interface GroupRoleInput
  extends Optional<GroupRoleAttributes, "roleId"> {}
export interface GroupRoleOuput extends Required<GroupRoleAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class GroupRole extends Model implements GroupRoleAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  public roleId!: number;

  @Column(DataTypes.STRING(20))
  public roleName!: string;

  @Column(DataTypes.BOOLEAN)
  public allowMessaging!: boolean;

  @Column(DataTypes.BOOLEAN)
  public allowDeletion!: boolean;

  @Column(DataTypes.BOOLEAN)
  public allowRemoval!: boolean;

  @ForeignKey(() => Group)
  @Column
  public groupId!: number;

  @BelongsTo(() => Group)
  public group!: Group;

  @HasMany(() => UserInGroup)
  public userInGroups!: UserInGroup[];
}

export default GroupRole;
