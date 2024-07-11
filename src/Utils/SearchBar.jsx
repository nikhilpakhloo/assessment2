import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Call the onSearch callback with the current search term
  };

  return (
    <div className="mt-4 mb-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by Name"
        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
