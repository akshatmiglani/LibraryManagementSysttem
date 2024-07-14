import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => (
  <div className="flex bg-white rounded shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md p-2 h-28">
    <Link to={`/books/${book._id}`} className="flex-shrink-0">
      <div className="w-16 h-24 overflow-hidden bg-gray-200">
        {book.imageLinks && book.imageLinks.thumbnail ? (
          <img
            alt={book.title}
            src={book.imageLinks.thumbnail}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}
      </div>
    </Link>
    <div className="ml-3 flex-grow overflow-hidden">
      <Link to={`/books/${book._id}`}>
        <h3 className="text-sm font-medium text-gray-900 truncate hover:text-indigo-600">
          {book.title}
        </h3>
      </Link>
      <p className="mt-1 text-xs text-gray-600 truncate">
        {book.authors ? book.authors.join(", ") : "Unknown Author"}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        {book.publishedDate
          ? new Date(book.publishedDate).getFullYear()
          : "Unknown Year"}
      </p>
    </div>
  </div>
);

export default BookCard;
