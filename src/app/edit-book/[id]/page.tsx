import { notFound } from "next/navigation";
import { BookForm } from "@/components/book-forms";
import { apiJson, publicApiFetch } from "@/lib/api";
import type { Book } from "@/lib/books";
import { requireUser } from "@/lib/dal";

export const metadata = { title: "Edit Book" };

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser(`/edit-book/${encodeURIComponent(id)}`);
  const response = await publicApiFetch(`/books/${encodeURIComponent(id)}`);
  if (response.status === 404) notFound();
  const book = await apiJson<Book>(response);
  if (book.addedByEmail !== user.email.toLowerCase()) notFound();

  return <main id="main-content" className="form-page"><BookForm mode="edit" book={book} /></main>;
}
