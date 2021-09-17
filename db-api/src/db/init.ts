import Sequelize from "./config";

const isDev = process.env.NODE_ENV === "development";

const dbInit = async () => {
  await Sequelize.sync({ alter: isDev });
};
export default dbInit;
