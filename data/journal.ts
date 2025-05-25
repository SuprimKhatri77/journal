"use server";
import { db } from "../lib/db";
import { JournalEntry } from "../lib/db/schema";
import { eq } from "drizzle-orm";

// Create operation
export async function createEntry(data: { title: string; content: string }) {
  await db.insert(JournalEntry).values({
    title: data.title,
    content: data.content,
  });
}

// retrieveing all the entries
export async function getAllEntries() {
  return await db.select().from(JournalEntry).orderBy(JournalEntry.createdAt);
}

// retrieving a particular entry
export async function getEntry(id: string) {
  await db
    .select()
    .from(JournalEntry)
    .where(eq(JournalEntry.id, id))
    .then((rows) => rows[0]);
}

// update operation
export async function updateEntry(
  id: string,
  data: { title: string; content: string }
) {
  await db
    .update(JournalEntry)
    .set({
      title: data.title,
      content: data.content,
      updatedAt: new Date(),
    })
    .where(eq(JournalEntry.id, id));
}

// delte operation
export async function deleteEntry(id: string) {
  await db.delete(JournalEntry).where(eq(JournalEntry.id, id));
}
