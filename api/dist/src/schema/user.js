"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.user = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const playlist_1 = require("./playlist");
exports.user = (0, mysql_core_1.mysqlTable)("user", {
    userId: (0, mysql_core_1.serial)("id").primaryKey(),
    userName: (0, mysql_core_1.text)("username"),
    userPassword: (0, mysql_core_1.text)("password"),
    userEmail: (0, mysql_core_1.text)("email"),
    createdAt: (0, mysql_core_1.timestamp)("created_at"),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at"),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.user, ({ many }) => ({
    playlist: many(playlist_1.playlist),
}));
//# sourceMappingURL=user.js.map