import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BookItem from "./components/BookItem";
import PopupMessage from "./components/PopupMessage";

function App() {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleSearch = async (term) => {
    setType("loading");
    setMessage("Loading...");
    setBooks([]);

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
      setType("error");
      setMessage(err.message);
    } finally {
      setMessage((msg) => (msg === "Loading..." ? null : msg));
      setType((val) => (val === "loading" ? null : val));
    }
  };

  useEffect(() => {
    setPopupVisible(type !== null);
  }, [type]);

  const handleClosePopup = (event) => {
    if (event.target.classList.contains("popup-close")) {
      setMessage((msg) => (msg !== "Loading..." ? null : msg));
      setType((val) => (val !== "loading" ? null : val));
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
      <div className="books-container" onClick={handleSaveClicked}>
        {books.length === 0 && !type && (
          <p>No books found. Try a different search term.</p>
        )}
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
      {popupVisible && (
        <PopupMessage
          type={type}
          message={message}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default App;
