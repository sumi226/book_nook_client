import { Catalog } from "@/components/catalog";

export const metadata = { title: "All Books" };

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <main id="main-content"><Catalog initialCategory={category} /></main>;
}
