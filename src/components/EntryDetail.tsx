import Link from "next/link"
type Entry = {
    title: string;
    content: string;
}

export default async function EntryDetailPage({ entry, entryId }: { entry: Entry, entryId: string }) {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="bg-gray-700 py-5 px-4 rounded-lg flex flex-col gap-5 ">
                <Link href={`/`} className="underline hover:no-underline">&#8592; Go back</Link>
                <div>

                    <h2 className="text-3xl font-bold capitalize">{entry.title}</h2>
                    <p className="pl-5 text-lg text-gray-400">{entry.content}</p>
                </div>
                <Link href={`${entryId}/edit-entry/${entryId}`} className="bg-blue-600 py-2 px-5 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out">Edit</Link>
                <Link href={""} className="bg-red-600 py-2 px-5 rounded-md text-lg font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out">Delete</Link>
            </div>
        </div>
    )
}