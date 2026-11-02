export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedByName: string;
  addedByEmail: string;
  createdAt: string;
};

export type Borrow = {
  id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  returnedAt?: string;
};

export const categories = [
  "All",
  "Fiction",
  "Classics",
  "Mystery",
  "Poetry",
  "Non-fiction",
  "Fantasy",
];

export function isBookAvailable(book: Book) {
  return book.availableCopies > 0;
}
