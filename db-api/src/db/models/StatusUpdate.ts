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
import User from "./User";

export type Statuses = "Online" | "Offline" | "In chat";

interface StatusUpdateAttributes {
  status: string;
  userId: number;
  groupId?: number;
}
export interface StatusUpdateInput
  extends Optional<StatusUpdateAttributes, "userId"> {}
export interface StatusUpdateOuput extends Required<StatusUpdateAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class StatusUpdate extends Model implements StatusUpdateAttributes {
  @Column({
    type: DataTypes.STRING(10),
    values: ["Online", "Offline", "In chat"],
  })
  public status!: string;

  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @BelongsTo(() => User)
  public user!: User;

  @AllowNull
  @ForeignKey(() => Group)
  @Column
  public groupId!: number;

  @BelongsTo(() => Group)
  public group!: Group;
}

export default StatusUpdate;
