import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, BookOpen } from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/books">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-3xl">{book.title}</CardTitle>
            <Badge variant={book.available ? "default" : "secondary"}>
              {book.available ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Author</p>
            <p className="text-lg font-medium">{book.author}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Genre</p>
            <p className="text-lg font-medium">{book.genre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ISBN</p>
            <p className="text-lg font-medium">{book.isbn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Copies Available</p>
            <p className="text-lg font-medium">{book.copies}</p>
          </div>
          {book.description && (
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-lg">{book.description}</p>
            </div>
          )}
          <div className="flex gap-2 pt-4">
            <Button asChild>
              <Link to={`/edit-book/${book._id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Book
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/borrow/${book._id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Borrow Book
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

