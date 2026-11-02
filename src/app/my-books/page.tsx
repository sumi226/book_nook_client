import { MyBooksContent } from "./my-books-content";
import { requireUser } from "@/lib/dal";

export default async function MyBooksPage() {
  await requireUser("/my-books");
  return <MyBooksContent />;
}
