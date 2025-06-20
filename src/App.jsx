import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BookItem from "./components/BookItem";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);

  const handleSearch = async (term) => {
    setLoading(true);
    setError(null);

    try {
      const encodedTerm = encodeURIComponent(term);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodedTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClicked = (event) => {
    // Check if the clicked element has the class 'save_button'
    if (!(event.target && event.target.classList.contains("save_button"))) {
      return;
    }
    const bookId = event.target.dataset.bookid;
    // Check if the book is already saved
    if (savedBooks.some((book) => book.id === bookId)) {
      return;
    }
    // Find the book in the books array
    const bookToSave = books.find((book) => book.id === bookId);
    if (bookToSave) {
      setSavedBooks([...savedBooks, bookToSave]);
    }
  };

  return (
    <div className="App">
      <h1>Book Finder App 📚</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="books-container" onClick={handleSaveClicked}>
        {books.length === 0 && !loading && (
          <p>No books found. Try a different search term.</p>
        )}
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;
