import React, { useState, useEffect } from 'react';

const NavigationAndSearch = ({ onNavigate, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 3) {
        // Panggil fungsi pencarian setelah debounced timeout
        onSearch(searchQuery);
      }
    }, 300); // Sesuaikan timeout sesuai kebutuhan

    return () => clearTimeout(delayDebounceFn); // Bersihkan timeout setiap kali input berubah
  }, [searchQuery, onSearch]);

  return (
    <div className="flex flex-col md:flex-row md:px-20 px-6 items-center">
    <div className="flex flex-grow md:mr-auto md:mb-0 mb-4">
      <input
        type="text"
        placeholder="Search"
        className="input input-error hover:border-red-600 border-gray-600 transition-all rounded-3xl w-[275px] h-10 mt-3 mx-auto md:mx-0"
        onChange={({ target }) => setSearchQuery(target.value)}
      />
    </div>

    </div>
  );
};

export default NavigationAndSearch;
