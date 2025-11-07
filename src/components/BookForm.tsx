import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from "@/features/api/apiSlice";
import type { Book } from "@/features/api/apiSlice";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  isbn: z.string().min(1),
  description: z.string().optional(),
  copies: z.number().min(0),
});

type FormData = z.infer<typeof schema>;

interface Props {
  book?: Book;
}

export default function BookForm({ book }: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: book
      ? {
          title: book.title,
          author: book.author,
          genre: book.genre,
          isbn: book.isbn,
          description: book.description,
          copies: book.copies,
        }
      : { copies: 1 },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (book) {
        await updateBook({
          id: book._id,
          data: { ...data, available: data.copies > 0 },
        }).unwrap();
        toast({ title: "Book updated!" });
      } else {
        await createBook({ ...data, available: data.copies > 0 }).unwrap();
        toast({ title: "Book created!" });
      }
      navigate("/books");
    } catch {
      toast({ title: "Operation failed", variant: "destructive" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto"
    >
      <div>
        <Label>Title</Label>
        <Input {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label>Author</Label>
        <Input {...register("author")} />
      </div>

      <div>
        <Label>Genre</Label>
        <Input {...register("genre")} />
      </div>

      <div>
        <Label>ISBN</Label>
        <Input {...register("isbn")} />
      </div>

      <div>
        <Label>Description (Optional)</Label>
        <Textarea {...register("description")} />
      </div>

      <div>
        <Label>Copies</Label>
        <Input type="number" {...register("copies", { valueAsNumber: true })} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {book ? "Update Book" : "Create Book"}
      </Button>
    </form>
  );
}
