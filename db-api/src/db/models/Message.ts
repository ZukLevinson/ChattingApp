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
import User from "./User";

interface MessageAttributes {
  messageId?: number;
  content: string;
  userId: number;
  groupId: number;
}
export interface MessageInput
  extends Optional<MessageAttributes, "messageId"> {}
export interface MessageOuput extends Required<MessageAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class Message extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  public messageId!: number;

  @Column(DataTypes.TEXT)
  public content!: string;

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

export default Message;
