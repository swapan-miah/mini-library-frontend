import { baseApi } from "@/app/redux/api/baseApi";
import type { Book } from "@/app/type/book.type";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: { books: Book[] };
      }) => {
        return response.data?.books || [];
      },
      providesTags: ["Books"],
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
