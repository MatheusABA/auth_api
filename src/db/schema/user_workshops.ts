import { text, pgTable } from "drizzle-orm/pg-core";
import { users } from "./user";
import { workshops } from "./workshop";

export const userWorkshops = pgTable("user_workshops", {
  userId: text("user_id").notNull().references(() => users.id),
  workshopId: text("workshop_id").notNull().references(() => workshops.id),
});