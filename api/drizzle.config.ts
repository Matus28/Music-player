import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    database: process.env.DATABASE ?? "",
    host: process.env.HOST ?? "",
    user: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
  },
} satisfies Config;
