import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../Filtergenre/BookCard';
import Pagination from '../Filtergenre/Pagination';
import HomeHeader from '../header/Homeheader';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div className="">
      <HomeHeader />  {/* Use the Header component */}
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
