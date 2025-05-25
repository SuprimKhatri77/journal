import { db } from "../../lib/db";
import { JournalEntry } from "../../lib/db/schema";
import Home from "@/components/Home";
import { JournalEntryType } from "../../lib/db/schema";

export default async function () {
  const allEntries: JournalEntryType[] = await db.select().from(JournalEntry)
  return <Home allEntries={allEntries} />
}