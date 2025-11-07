import { useGetBorrowSummaryQuery } from "@/features/api/apiSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BorrowSummary() {
  const { data: summary = [], isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary...</p>;

  console.log(summary);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Borrow Summary</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary.map((item) => (
            <TableRow key={item.isbn}>
              <TableCell>{item.bookTitle}</TableCell>
              <TableCell>{item.isbn}</TableCell>
              <TableCell>{item.totalBorrowed}</TableCell>
              <TableCell>
                {new Date(item.dueDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
