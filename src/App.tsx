import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookList from "./pages/BookList";
import CreateBook from "./pages/CreateBook";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";
import BorrowForm from "./pages/BorrowForm";
import BorrowSummary from "./pages/BorrowSummary";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
