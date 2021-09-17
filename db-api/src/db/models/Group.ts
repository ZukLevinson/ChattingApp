import { DataTypes, Model, Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface GroupAttributes {
  groupId: number;
  groupName: string;
  groupDescription?: string;
}
export interface GroupInput extends Optional<GroupAttributes, "groupId"> {}
export interface GroupOuput extends Required<GroupAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class Group
  extends Model
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  public groupId!: number;

  @Column(DataTypes.STRING(20))
  public groupName!: string;

  @AllowNull
  @Column(DataTypes.STRING(120))
  public groupDescription?: string;
}

export default Group;
