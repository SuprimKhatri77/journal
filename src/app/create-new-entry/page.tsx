"use client"
import { useActionState } from "react"
import { addEntry, FormState } from "../../../actions/journal"

export default function createNewEntry() {
    const initialState: FormState = {
        errors: {}
    }

    const [state, formAction, isPending] = useActionState<FormState, FormData>(addEntry
        , initialState)

    return (
        <div className=" flex flex-col justify-center items-center h-screen">
            <form action={formAction} className="border border-gray-500 cursor-pointer py-5 px-4 rounded-md">
                <h1 className="text-2xl font-bold">Create new Journal Entry</h1>
                <div className="py-2">
                    <label htmlFor="title">
                        Title:
                        <input type="text" name="title" id="title" placeholder="enter title" className="border border-gray-400" />
                    </label>
                    {state.errors.title && (
                        <p className="text-red-500 text-sm"> {state.errors.title} </p>
                    )}
                </div>
                <div className="py-2">
                    <label htmlFor="content">
                        Content:
                        <textarea name="content" id="content" placeholder="content" className="border border-gray-400" />
                    </label>
                    {state.errors.content && (
                        <p className="text-red-500 text-sm"> {state.errors.content} </p>
                    )}
                </div>

                <button type="submit" className="bg-blue-800 hover:bg-blue-900 transition-all duration-300 ease-in-out py-2 px-5 cursor-pointer text-xl font-bold" disabled={isPending}>
                    {isPending ? "Creating......" : "Create new Entry"}
                </button>
            </form>
        </div>
    )
}