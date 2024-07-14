import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Filter from "../Filtergenre/Filter";
import SearchBar from "../SearchBar";
import HomeHeader from "../header/Homeheader";
import axios from 'axios';
import BookCard from "../Filtergenre/BookCard";

const HomePage = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/books/latestbooks"); // Adjust API endpoint as needed
        setLatestBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching latest books");
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 grany">
      {/* <nav className="bg-gray-800 shadow p-4 flex justify-between">
        <div className="flex items-center space-x-4">
          <img src="book-library.ico" alt="Library Logo" className="h-10" />
          <h1 className="text-xl font-bold text-white">Book Space</h1>
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
      </nav> */}
      <HomeHeader />

      <div className="text-center py-12">
        <h2 className="text-3xl font-semibold mb-4">
          Search the books available in library
        </h2>

        <div className="flex justify-center mb-8">
          {/* <input
            type="text"
            placeholder="Enter book name"
            className="border p-2 w-1/2"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Search
          </button> */}

          {/* Search Functionality */}
          <SearchBar />
        </div>

        <div className="flex justify-center gap-4">
          <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">New Arrivals</h3>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="space-y-4">
                {latestBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </div>
          <div className="w-1/5 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Search By Genres</h3>
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
