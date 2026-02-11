import { relations } from "drizzle-orm";
import { accounts } from "./accounts";
import { sessions } from "./sessions";
import { users } from "./user";
import { userWorkshops } from "./user_workshops";
import { workshops } from "./workshop";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  userWorkshops: many(userWorkshops),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const workshopsRelations = relations(workshops, ({ many }) => ({
  userWorkshops: many(userWorkshops),
}))