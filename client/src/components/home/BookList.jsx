import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
        {book.authors ? book.authors.join(', ') : 'Unknown Author'}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        {book.publishedDate ? new Date(book.publishedDate).getFullYear() : 'Unknown Year'}
      </p>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, paginate }) => (
  <nav className="flex justify-center mt-8">
    <ul className="flex items-center">
      <li>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md mr-1 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeftIcon size={16} />
        </button>
      </li>
      {[...Array(totalPages).keys()].map((number) => (
        <li key={number + 1} className="mx-1">
          <button
            onClick={() => paginate(number + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === number + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {number + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md ml-1 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronRightIcon size={16} />
        </button>
      </li>
    </ul>
  </nav>
);

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(24);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Book Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default BookList;