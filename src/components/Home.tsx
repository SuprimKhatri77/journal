"use client"
import { useState } from "react";
import Link from "next/link";
import { JournalEntryType } from "../../lib/db/schema";

export default function Home({ allEntries }: { allEntries: JournalEntryType[] }) {
    const [search, setSearch] = useState("")
    const filteredJournals: JournalEntryType[] = allEntries.filter((journal) => (
        `${journal.title} ${journal.content}`.toLowerCase().includes(search.toLowerCase())
    ))
    return (
        <div className="flex gap-5 py-2 px-5 flex-wrap items-center justify-center h-screen w-full">
            <input type="text" className="border" onChange={(e) => setSearch(e.target.value)} value={search} />
            {filteredJournals.length > 0 ? (
                filteredJournals.map((entry) => (
                    <Link href={`entry/${entry.id}`} key={entry.id} className="bg-gray-700 py-5 px-4 rounded-lg">
                        <h2 className="text-3xl font-bold capitalize">{entry.title}</h2>
                        <p className="pl-5 text-lg text-gray-400">{entry.content}</p>
                    </Link>
                ))
            ) : (
                <p>No entry found for the search term {search}</p>
            )}
        </div>
    );
}
