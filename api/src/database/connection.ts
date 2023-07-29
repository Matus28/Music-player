import * as dotenv from "dotenv";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { MySql2Database } from "drizzle-orm/mysql2";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export const db: MySql2Database<Record<string, never>> = drizzle(connection);
