import { BookForm } from "@/components/book-forms";
import { requireUser } from "@/lib/dal";

export const metadata = { title: "Add a Book" };
export default async function AddBookPage() {
  await requireUser("/add-book");
  return <main id="main-content" className="form-page"><BookForm mode="add" /></main>;
}
