// Re-export everything from bookApi and borrowApi
export * from "@/app/redux/api/featured/book/bookApi";
export * from "@/app/redux/api/featured/borrow/borrowApi";
export * from "@/app/redux/api/baseApi";

// Re-export types from type files
export * from "@/app/type/book.type";
export * from "@/app/type/borrowBook.type";

// Export the baseApi as 'api' for store compatibility
import { baseApi } from "@/app/redux/api/baseApi";
export const api = baseApi;

