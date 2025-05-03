"use client"
import { useActionState } from "react";
import { FormState, editEntry } from "../../actions/journal";

type Entry = {
    id: string;
    title: string;
    content: string;
}

export default function EditEntryForm({ entry }: { entry: Entry }) {
    const initialState: FormState = {
        errors: {}
    }


    const [state, formAction, isPending] = useActionState<FormState, FormData>(editEntry, initialState)
    return (
        <div className="h-screen flex flex-col justify-center items-center">

            <form action={formAction} className="border border-gray-700 py-10 px-5 flex flex-col gap-5">
                <input type="hidden" name="entryId" value={entry.id} />
                <h1>Edit Entry</h1>
                <div>

                    <label htmlFor="">
                        Title:
                        <input type="text" name="title" defaultValue={entry.title} placeholder="enter title" className="border" />
                    </label>
                </div>
                <div>

                    <label htmlFor="">
                        Content:
                        <textarea name="content" defaultValue={entry.content} placeholder="enter title" className="border" />
                    </label>
                </div>

                <button type="submit" className="bg-green-700 hover:bg-green-800 transition-all duration-300 ease-in-out py-2 px-5 rounded-md cursor-pointer font-medium" disabled={isPending}>
                    {isPending ? "Updating...." : "Update entry"}
                </button>
            </form>
        </div>
    )
}