import { pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";

export const JournalEntry = pgTable("journal_entry", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  // authorId: uuid("author_id")
  //   .references(() => Author.id)
  //   .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// export const Author = pgTable("author", {
//   id: text().primaryKey(),
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull(),
// });

// export const authorRelations = relations(Author, ({ many }) => ({
//   JournalEntries: many(JournalEntry),
// }));

// export const journalRelations = relations(JournalEntry, ({ one }) => ({
//   author: one(Author, {
//     fields: [JournalEntry.authorId],
//     references: [Author.id],
//   }),
// }));

export type JournalEntryType = InferSelectModel<typeof JournalEntry>;
