import dotenv from "dotenv";

dotenv.config({
  path: process.cwd() + "\\.env." + process.env.NODE_ENV,
});
