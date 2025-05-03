import EntryDetailPage from "@/components/EntryDetail"
import { redirect } from "next/navigation"
import { getEntry } from "../../../../data/journal"
import { db } from "../../../../lib/db"
import { JournalEntry } from "../../../../lib/db/schema"
import { eq } from "drizzle-orm"
import EditEntryForm from "@/components/EditEntryForm"

export default async function SlugPages({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = (await params)

    if (!slug) {
        redirect("/")
    }

    if (slug.length === 1) {
        const id = slug[0]
        const entry = await db.select().from(JournalEntry).where(eq(JournalEntry.id, id)).then((rows) => rows[0])
        if (!entry) {
            throw new Error("Entry not found!")
        }
        return <EntryDetailPage entry={entry} entryId={id} />
    }

    if (slug.length === 3 && slug[1] === "edit-entry") {
        const id = slug[0]
        const entry = await db.select().from(JournalEntry).where(eq(JournalEntry.id, id)).then((rows) => rows[0])
        if (!entry) {
            throw new Error("Entry not found!")
        }
        return <EditEntryForm entry={entry} />
    }
    return (
        <h1>Page not found</h1>
    )
}