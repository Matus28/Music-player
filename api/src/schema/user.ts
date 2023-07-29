import { InferModel, relations } from "drizzle-orm";
import { mysqlTable, serial, text, timestamp } from "drizzle-orm/mysql-core";
import { playlist } from "./playlist";

export const user = mysqlTable("user", {
  userId: serial("id").primaryKey(),
  userName: text("username"),
  userPassword: text("password"),
  userEmail: text("email"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const userRelations = relations(user, ({ many }) => ({
  playlist: many(playlist),
}));

export type User = InferModel<typeof user>;
export type NewUser = InferModel<typeof user, "insert">;
