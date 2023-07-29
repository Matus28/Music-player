import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

const runMigrate = async () => {
  if (!process.env.DATABASE) {
    throw new Error("DATABASE is not defined!");
  }

  const poolConnection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
  });

  const db = drizzle(poolConnection);

  console.log("⏳ Migration running...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "drizzle" });

  const end = Date.now();

  console.log(`✅ Migration completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((error) => {
  console.error("❌ Migration failed");
  console.error(error);
  process.exit(1);
});
