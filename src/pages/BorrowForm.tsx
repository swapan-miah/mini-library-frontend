import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useBorrowBookMutation,
} from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  quantity: z.coerce.number().min(1),
  dueDate: z.string().min(1),
});

export default function BorrowForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (data.quantity > book!.copies) {
      toast({ title: "Not enough copies", variant: "destructive" });
      return;
    }

    try {
      await borrowBook({
        bookId: bookId!,
        quantity: data.quantity,
        dueDate: data.dueDate,
      }).unwrap();
      toast({ title: "Book borrowed!" });
      navigate("/borrow-summary");
    } catch {
      toast({ title: "Borrow failed", variant: "destructive" });
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Borrow: {book.title}</h1>
      <p className="text-sm text-gray-600 mb-6">
        Available: {book.copies} copies
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Quantity</Label>
          <Input type="number" {...register("quantity")} max={book.copies} />
          {errors.quantity && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <Label>Due Date</Label>
          <Input type="date" {...register("dueDate")} />
        </div>

        <Button type="submit" className="w-full">
          Borrow Book
        </Button>
      </form>
    </div>
  );
}
