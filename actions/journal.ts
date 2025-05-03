"use server";
import { z } from "zod";
import { createEntry, updateEntry } from "../data/journal";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  content?: string;
};

export type FormState = {
  errors: Errors;
};

export async function addEntry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formFields = Object.fromEntries(formData);

  const EntryData = z.object({
    title: z
      .string()
      .max(255, { message: "Title must be less than 255 characters" })
      .nonempty({ message: "Title is required" }),
    content: z.string().nonempty({ message: "Content is required" }),
  });

  const validateFields = EntryData.safeParse(formFields);

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;

    return {
      errors: {
        title: fieldErrors.title?.[0],
        content: fieldErrors.content?.[0],
      },
    };
  }

  await createEntry(validateFields.data);
  redirect("/");
}

export async function editEntry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formFields = Object.fromEntries(formData);
  const entryId = formFields.entryId as string;

  const EntryData = z.object({
    title: z
      .string()
      .max(255, { message: "Title must be less than 255 characters" })
      .nonempty({ message: "Title is required" }),
    content: z.string().nonempty({ message: "Content cannot be empty" }),
  });

  const validateFields = EntryData.safeParse(formFields);

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;
    return {
      errors: {
        title: fieldErrors.title?.[0],
        content: fieldErrors.content?.[0],
      },
    };
  }

  await updateEntry(entryId, validateFields.data);
  redirect("/");
}
