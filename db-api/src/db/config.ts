import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import User from "./models/User";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize({
  host: dbHost,
  dialect: "postgres",
  username: dbUser,
  password: dbPassword,
  database: dbName,
  models: [__dirname + "\\models"],
});

console.log(__dirname + "\\models");

export default sequelizeConnection;
