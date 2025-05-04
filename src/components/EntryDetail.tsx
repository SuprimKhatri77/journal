"use client"
import Link from "next/link"
import { deleteEntry } from "../../data/journal";
import { useState } from "react";
import { redirect } from "next/navigation";
import { JournalEntryType } from "../../lib/db/schema";


export default function EntryDetailPage({ entry, entryId }: { entry: JournalEntryType, entryId: string }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    async function handleDelete() {
        await deleteEntry(entryId)
        redirect("/")
    }
    return (
        <>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-[rgb(0,0,0,0.7)] flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
                        <p className="mb-6">Are you sure you want to delete "{entry.title}"?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4  py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="bg-gray-700 py-5 px-4 rounded-lg flex flex-col gap-5 ">
                    <Link href={`/`} className="underline hover:no-underline">&#8592; Go back</Link>
                    <div>

                        <h2 className="text-3xl font-bold capitalize">{entry.title}</h2>
                        <p className="pl-5 text-lg text-gray-400">{entry.content}</p>
                    </div>
                    <Link href={`${entryId}/edit-entry/${entryId}`} className="bg-blue-600 py-2 px-5 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out">Edit</Link>
                    <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 py-2 px-5 rounded-md text-lg font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer">Delete</button>
                    <p className="self-end">Created at: {entry.createdAt?.toLocaleDateString()}</p>
                    {
                        entry.updatedAt && (

                            <p className="self-end">Updated at: {entry.updatedAt?.toLocaleDateString()}</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}