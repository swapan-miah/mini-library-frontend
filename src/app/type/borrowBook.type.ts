import type { Book } from "./book.type";

export interface Borrow {
  _id: string;
  book: Book;
  quantity: number;
  dueDate: string;
  borrowedAt: string;
}

export interface BorrowSummary {
  bookTitle: string;
  isbn: string;
  totalBorrowed: number;
  dueDate: string;
}
