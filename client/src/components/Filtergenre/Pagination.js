import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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

export default Pagination;
