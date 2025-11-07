import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Library
        </Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link to="/books">All Books</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/create-book">Add Book</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/borrow-summary">Borrow Summary</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
