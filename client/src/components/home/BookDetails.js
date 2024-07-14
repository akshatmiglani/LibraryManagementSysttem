
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


    fetchBook();

    // Check if user token is available and valid
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token with backend or decode it
      axios
        .get("http://localhost:4000/api/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
        });
    }
  }, [id]);

  // Placeholder function for handling add to cart functionality
  const handleAddToCart = () => {
    if (!user) {
      alert("You need to be logged in to borrow books");
      navigate("/login");
      return;
    }

    // Add book to cart (this could be stored in a context or local storage)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...book, borrowDuration: 0 });
    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/cart");
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
            src={book.imageLinks?.smallThumbnail || "/placeholder-image.jpg"}
            alt={book.title || "Book Image"}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {book.title}
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            <strong>Author:</strong> {book.authors.join(", ")}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            <strong>Published Date:</strong> {book.publishedDate}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            <strong>Page Count:</strong> {book.pageCount}
          </p>
          <p className="text-xl text-gray-700 mb-2">
            <strong>Categories:</strong> {book.categories.join(", ")}
          </p>
          <p className="text-xl text-gray-700 mb-4">
            <strong>Average Rating:</strong> {book.averageRating}
          </p>
          <p className="text-xl text-gray-700 mb-4">
            <strong>Ratings Count:</strong> {book.ratingsCount}
          </p>
          <p className="text-lg text-gray-700 mb-4">{book.description}</p>
          {user && (
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Add to Cart
            </button>
          )}
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
