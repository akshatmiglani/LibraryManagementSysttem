import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from API when component mounts
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/books'); // Adjust endpoint as per your API setup
        setBooks(response.data); // Set books state with fetched data
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <article key={book._id} className="group">
          <Link to={`/books/${book._id}`}>
              {book.imageLinks && book.imageLinks.thumbnail ? (
                <img
                  alt={book.title}
                  src={book.imageLinks.thumbnail}
                  className="h-[500px] w-[500px] object-cover"
                />
              ) : (
                <div className="h-[300px] w-[300px] flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
          </Link>

          <div className="p-4">
            <time dateTime={book.publishedDate} className="block text-xs text-gray-500">{book.publishedDate}</time>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
            </Link>

            <p className="mt-2 text-sm text-gray-700 line-clamp-2">{book.description && book.description.length > 30 ? `${book.description.substring(0, 30)}...` : book.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BookList;
