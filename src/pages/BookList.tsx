import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Trash2, Edit, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function BookList() {
  const { data: booksData, isLoading, error } = useGetBooksQuery();

  console.log(booksData);
  const [deleteBook] = useDeleteBookMutation();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Ensure books is always an array
  const books = Array.isArray(booksData) ? booksData : [];

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBook(deleteId).unwrap();
      toast({ title: "Book deleted successfully" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
    setDeleteId(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Books</h1>
        <Button asChild>
          <Link to="/create-book">Add New Book</Link>
        </Button>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No books found. Create your first book!
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">
                  <Link to={`/books/${book._id}`} className="hover:underline">
                    {book.title}
                  </Link>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <Badge variant={book.available ? "default" : "secondary"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/edit-book/${book._id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/borrow/${book._id}`}>
                      <BookOpen className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteId(book._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book?</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this book?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
