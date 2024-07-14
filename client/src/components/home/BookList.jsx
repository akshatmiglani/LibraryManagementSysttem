import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/books');
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Improved Card Design and Grid Layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {books.map((book) => (
        <article key={book._id} className="book-card">
          <Link to={`/books/${book._id}`}>
            <img
              src={book.imageLinks?.thumbnail || '/placeholder-image.jpg'} // Handle missing image with placeholder
              alt={book.title || 'Book Image'} // Set default alt text
              className="h-[300px] w-[200px] object-cover"
            />
          </Link>
          <div className="book-card-content p-4">  {/* Added a class for content */}
            <time dateTime={book.publishedDate} className="block text-xs text-gray-500 mt-2">
              {book.publishedDate}
            </time>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
            </Link>
            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
              {book.description?.length > 30
                ? `${book.description.substring(0, 30)}...`
                : book.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BookList;
