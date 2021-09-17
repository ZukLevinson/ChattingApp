import { DataTypes, Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import sequelizeConnection from "../config";
import Group from "./Group";

interface UserAttributes {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}
export interface UserInput extends Optional<UserAttributes, "userId"> {}
export interface UserOuput extends Required<UserAttributes> {}

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
class User extends Model implements UserAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  public userId!: number;

  @Column(DataTypes.STRING(20))
  public firstName!: string;

  @AllowNull
  @Column(DataTypes.STRING(60))
  public lastName!: string;

  @Unique
  @Column(DataTypes.STRING(25))
  public username!: string;

  @Column({ type: DataTypes.STRING(60), validate: { isEmail: true } })
  public email!: string;

  @HasMany(() => Group)
  public groups!: Group[];
}

export default User;
