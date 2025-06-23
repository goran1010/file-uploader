import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

//add ?sslmode=require when deploying to server

export default new Pool({
  connectionString: `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`,
});
