import { MyBooksContent } from "./my-books-content";
import { requireUser } from "@/lib/dal";

export const metadata = { title: "My Books" };

export default async function MyBooksPage() {
  await requireUser("/my-books");
  return <MyBooksContent />;
}
