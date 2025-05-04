import { db } from "../../lib/db";
import { JournalEntry } from "../../lib/db/schema";
import Link from "next/link";

export default async function Home() {
  const allEntries = await db.select().from(JournalEntry).orderBy(JournalEntry.createdAt);
  return (
    <div className="flex gap-5 py-2 px-5 flex-wrap items-center justify-center h-screen w-full">
      {allEntries.map((entry) => (
        <Link href={`entry/${entry.id}`} key={entry.id} className="bg-gray-700 py-5 px-4 rounded-lg">
          <h2 className="text-3xl font-bold capitalize">{entry.title}</h2>
          <p className="pl-5 text-lg text-gray-400">{entry.content}</p>
        </Link>
      ))}
    </div>
  );
}
