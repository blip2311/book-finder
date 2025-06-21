import React from "react";
import "./BookItem.css";

const BookItem = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks, description } = volumeInfo;

  return (
    <div className="book-item">
      <div className="book-image">
        <img
          src={imageLinks?.thumbnail || "/assets/placeholder-book.png"}
          alt={title}
        />
      </div>
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        {authors && <p className="book-authors">{authors.join(", ")}</p>}
        {description && <p className="book-description">{description}</p>}
        <button className="save_button" data-bookid={book.id}>
          Save
        </button>
      </div>
    </div>
  );
};

export default BookItem;
