import { randomUUIDv7 } from "bun";
import { text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const workshops = pgTable("workshops", {
  id: text("id").primaryKey().$defaultFn(() => randomUUIDv7()),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
});