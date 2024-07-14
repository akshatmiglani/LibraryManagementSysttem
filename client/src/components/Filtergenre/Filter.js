import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook from react-router-dom

const Filter = () => {
  const navigate = useNavigate(); // Initialize useHistory hook

  const [selectedCategory, setSelectedCategory] = useState("");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleCategoryClick = async (category, page = 1) => {
    setSelectedCategory(category);
    // Navigate to a new route with selected category
    navigate(`/books/${category}`);
  };

  // FetchBooks function removed for clarity

  const handlePageChange = (page) => {
    // Implement logic for fetching books based on page, if needed
    setCurrentPage(page);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex flex-col w-full mb-4">
        {[
          "Fiction",
          "Juvenile Fiction",
          "History",
          "Science",
          "Adventure",
          "Political Science",
          "Philosophy",
          "Classics",
          "Medical",
        ].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4  shadow-md cursor-pointer mb-2 w-full"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
