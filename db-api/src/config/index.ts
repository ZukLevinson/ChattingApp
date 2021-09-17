import dotenv from "dotenv";
console.log(process.cwd() + "\\.env." + process.env.NODE_ENV);
dotenv.config({
  path: process.cwd() + "\\.env." + process.env.NODE_ENV,
});
