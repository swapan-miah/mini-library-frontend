import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "@/app/type/book.type";
import type { Borrow, BorrowSummary } from "@/app/type/borrowBook.type";

export type { Book, Borrow, BorrowSummary };

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mini-library-backend.vercel.app/api",
  }),
  tagTypes: ["Books", "Borrows", "Summary"],
  endpoints: () => ({}),
});
