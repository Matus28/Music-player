"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("drizzle-orm/mysql2");
const migrator_1 = require("drizzle-orm/mysql2/migrator");
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const runMigrate = async () => {
    if (!process.env.DATABASE) {
        throw new Error("DATABASE is not defined!");
    }
    // const poolConnection = mysql.createPool({
    //   host: process.env.HOST,
    //   user: process.env.DBUSERNAME,
    //   password: process.env.PASSWORD,
    //   database: process.env.DATABASE,
    //   multipleStatements: true,
    // });
    const poolConnection = promise_1.default.createPool(process.env.DATABASE_URL ?? "");
    const db = (0, mysql2_1.drizzle)(poolConnection);
    console.log("⏳ Migration running...");
    const start = Date.now();
    await (0, migrator_1.migrate)(db, { migrationsFolder: "drizzle" });
    const end = Date.now();
    console.log(`✅ Migration completed in ${end - start}ms`);
    process.exit(0);
};
runMigrate().catch((error) => {
    console.error("❌ Migration failed");
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=migrate.js.map