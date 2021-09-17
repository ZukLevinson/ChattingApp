import Ingredient from "./models/Ingredient";

const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  Ingredient.sync({ alter: isDev });
};
export default dbInit;
