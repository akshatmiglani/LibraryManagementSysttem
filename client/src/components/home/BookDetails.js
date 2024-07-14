import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookList from './BookList';
import HomeHeader from '../header/Homeheader';

const BookDetails = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL
  const [book, setBook] = useState(null); // State to hold the book data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Fetch book details from the API using Axios
        const response = await axios.get(`http://localhost:4000/api/books/book/${id}`);
        setBook(response.data); // Set the book state with the fetched data
      } catch (error) {
        setError('Error fetching book details'); // Set error state if fetching fails
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchBook(); // Call fetchBook function when component mounts or ID changes
  }, [id]); // Dependence on 'id' ensures it refetches when 'id' changes

  // Placeholder function for handling add to cart functionality
  const handleAddToCart = () => {
    // Implement add to cart functionality here if needed
  };

  // Render loading state if still loading
  if (loading) return <div>Loading...</div>;
  
  // Render error message if there's an error fetching data
  if (error) return <div>{error}</div>;

  // Render book details once loaded
  return (<>
    <HomeHeader />
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={book.imageLinks?.smallThumbnail || '/placeholder-image.jpg'}
            alt={book.title || 'Book Image'}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
          <p className="text-xl text-gray-700 mb-2"><strong>Author:</strong> {book.authors?.join(', ')}</p>
          <p className="text-xl text-gray-700 mb-2"><strong>Publisher:</strong> {book.publisher}</p>
          <p className="text-xl text-gray-700 mb-2"><strong>Published Date:</strong> {book.publishedDate}</p>
          <p className="text-xl text-gray-700 mb-2"><strong>Page Count:</strong> {book.pageCount}</p>
          <p className="text-xl text-gray-700 mb-2"><strong>Categories:</strong> {book.categories?.join(', ')}</p>
          <p className="text-xl text-gray-700 mb-2"><strong>Average Rating:</strong> {book.averageRating}</p>
          <p className="text-xl text-gray-700 mb-4"><strong>Ratings Count:</strong> {book.ratingsCount}</p>
          <p className="text-lg text-gray-700 mb-4">{book.description}</p>
        
          <a
            href={book.infoLink}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookDetails;
