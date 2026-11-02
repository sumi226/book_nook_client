import { requireUser } from "@/lib/dal";
import { MyBorrowsContent } from "./my-borrows-content";

export const metadata = { title: "My Borrows" };

export default async function MyBorrowsPage() {
  await requireUser("/my-borrows");
  return <MyBorrowsContent />;
}
