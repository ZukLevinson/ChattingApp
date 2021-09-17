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
} from "sequelize-typescript";
import GroupRole from "./GroupRole";
import Message from "./Message";
import StatusUpdate from "./StatusUpdate";
import User from "./User";

interface GroupAttributes {
  groupId?: number;
  groupName: string;
  groupDescription?: string;
  creatorId: number;
}
export interface GroupInput extends Optional<GroupAttributes, "groupId"> {}
export interface GroupOuput extends Required<GroupAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class Group extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  public groupId!: number;

  @Column(DataTypes.STRING(20))
  public groupName!: string;

  @AllowNull
  @Column(DataTypes.STRING(120))
  public groupDescription?: string;

  @ForeignKey(() => User)
  @Column
  public creatorId!: number;

  @BelongsTo(() => User)
  public creator!: User;

  @HasMany(() => GroupRole)
  public groupRoles!: GroupRole[];

  @HasMany(() => StatusUpdate)
  public statusUpdates!: StatusUpdate[];

  @HasMany(() => Message)
  public messages!: Message[];
}

export default Group;
