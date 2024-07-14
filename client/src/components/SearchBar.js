import axios from "axios";
import React, { useState } from "react";

const SearchBar = () => {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [showResults, setShowResults] = useState(false); // State to manage showing results section
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(""); // State to manage error message

  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setTitle(searchValue);

    if (searchValue.trim().length > 0) {
      // Reset error message and set loading state
      setError("");
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:4000/api/search/books`,
          {
            params: { title: searchValue },
          }
        );
        setBooks(response.data || []); // Ensure default to empty array if no items
        setShowResults(true); // Show results section

        // Check if no books found
        if (response.data.length === 0) {
          setError("Book not found");
        } else {
          setError(""); // Clear error if books are found
        }
      } catch (error) {
        console.error("Failed to fetch books", error.response || error);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    } else {
      setBooks([]);
      setShowResults(false); // Hide results section when search input is empty
      setError(""); // Clear error message when input is empty
    }
  };

  return (
    <div className="relative w-[70%] border-blue-600 border-2 rounded-lg mt-7">
      <input
        type="text"
        placeholder="Search for books by title..."
        value={title}
        onChange={handleSearch}
        className="w-full px-3 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {showResults && (
        <section className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {loading && <p className="px-4 py-2 text-center">Loading...</p>}
          {!loading && (
            <ul className="divide-y divide-gray-200">
              {books.length > 0 ? (
                books.map((book) => (
                  <li key={book._id} className="px-4 py-2">
                    <a
                      href={book.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                    >
                      {book.title} by {book.authors.join(", ")}
                    </a>
                    <p className="text-gray-500 text-sm">
                      Published by {book.publisher}
                    </p>
                  </li>
                ))
              ) : (
                <p className="px-4 py-2 text-center">
                  {error || "Book not found"}
                </p>
              )}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchBar;
