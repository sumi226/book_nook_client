import { notFound } from "next/navigation";
import { BookForm } from "@/components/book-forms";
import { books } from "@/lib/books";
import { requireUser } from "@/lib/dal";

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireUser(`/edit-book/${encodeURIComponent(id)}`);
  const book = books.find((item) => item.id === id);
  if (!book) notFound();
  return <main id="main-content" className="form-page"><BookForm mode="edit" book={book} /></main>;
}
