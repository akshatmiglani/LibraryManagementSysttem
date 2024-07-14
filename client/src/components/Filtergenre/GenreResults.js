import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const GenreResults = () => {
  const { category } = useParams(); // Extract category from URL parameter
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBooks(category, currentPage);
  }, [category, currentPage]);

  const fetchBooks = async (category, page) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/filter/genre?category=${category}&page=${page}&limit=10`
      );
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handlePageChange = (page) => {
    fetchBooks(category, page);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 grany">
      <nav className="bg-gray-800 shadow p-4 flex justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="book-library.ico" alt="Library Logo" className="h-10" />
            <h1 className="text-xl font-bold text-white">Book Space</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Books in {category}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 truncate">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2 truncate">
                  Author: {book.authors.join(", ")}
                </p>
                {/* Additional book details */}
                {/* <p className="text-gray-600 mb-2 truncate">Publisher: {book.publisher}</p> */}
                {/* <p className="text-gray-600 mb-2 truncate">Published Date: {book.publishedDate}</p> */}
                {/* <p className="text-gray-600 mb-2 truncate">Description: {book.description}</p> */}
                {/* <p className="text-gray-600 mb-2 truncate">Page Count: {book.pageCount}</p> */}
                <p className="text-gray-600 mb-2 truncate">
                  Main Category: {book.mainCategory}
                </p>
                <p className="text-gray-600 mb-2 truncate">
                  Average Rating: {book.averageRating}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg shadow-md cursor-pointer"
          >
            {"<"}
          </button>
          <div className="flex">
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg shadow-md cursor-pointer ${
                  i + 1 === currentPage ? "bg-gray-300" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            {totalPages > 3 && <span className="px-2">...</span>}
            {totalPages > 3 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg shadow-md cursor-pointer ${
                  totalPages === currentPage ? "bg-gray-300" : ""
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg shadow-md cursor-pointer"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreResults;
