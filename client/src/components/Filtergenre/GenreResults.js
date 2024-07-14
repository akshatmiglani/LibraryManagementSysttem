import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookCard from './BookCard';  // Import the BookCard component
import Pagination from './Pagination';  // Import the Pagination component
import HomeHeader from '../header/Homeheader';  // Import the Header component

const GenreResults = () => {
  const { category } = useParams();  // Extract category from URL parameter
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks(category, currentPage);
  }, [category, currentPage]);

  const fetchBooks = async (category, page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/filter/genre?category=${category}&page=${page}&limit=24`
      );
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(category, page);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="">
      <HomeHeader />  {/* Use the Header component */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Books in {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        paginate={handlePageChange} 
      />
    </div>
  );
};

export default GenreResults;
