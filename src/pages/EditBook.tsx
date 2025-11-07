import { useParams } from "react-router-dom";
import { useGetBookQuery } from "@/features/api/apiSlice";
import BookForm from "@/components/BookForm";

export default function EditBook() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <BookForm book={book} />
    </div>
  );
}

