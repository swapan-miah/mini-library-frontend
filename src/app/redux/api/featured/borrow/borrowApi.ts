import { baseApi } from "@/app/redux/api/baseApi";
import type { Borrow, BorrowSummary } from "@/app/type/borrowBook.type";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      Borrow,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, ...body }) => ({
        url: `/borrows/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books", "Borrows", "Summary"],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "/borrows/borrow-summary",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: Array<{
          title: string;
          isbn: string;
          totalBorrowed: number;
          dueDate: string;
        }>;
      }) => {
        return (
          response.data?.map((item) => ({
            bookTitle: item.title,
            isbn: item.isbn,
            totalBorrowed: item.totalBorrowed,
            dueDate: item.dueDate,
          })) || []
        );
      },
      providesTags: ["Summary"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
