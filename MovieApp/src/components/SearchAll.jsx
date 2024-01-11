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
    <div className="flex flex-row md:px-20 px-6">
      <div className="flex mr-auto">
        <input
          type="text"
          placeholder="Search"
          className="input input-error hover:border-red-600 border-gray-600 transition-all rounded-3xl w-[275px]  h-10 mt-3"
          onChange={({ target }) => setSearchQuery(target.value)}
        />
      </div>

      <div className="gap-5 mt-5 ml-3 hidden lg:flex">
        <p
          className="font-bold justify-center flex  text-red-600  hover:text-red-900  transition-all cursor-pointer"
          onClick={() => onNavigate('/tvshow')}
        >
          TV Shows
        </p>
        <p
          className="font-bold justify-center flex  text-red-600  hover:text-red-900 transition-all cursor-pointer "
          onClick={() => onNavigate('/')}
        >
          Popular
        </p>
        <p
          className="font-bold justify-center flex  text-red-600  hover:text-red-900 transition-all cursor-pointer "
          onClick={() => onNavigate('/nowplaying')}
        >
          Now Playing
        </p>
        <p
          className="font-bold justify-center flex  text-red-600  hover:text-red-900 transition-all cursor-pointer "
          onClick={() => onNavigate('/upcoming')}
        >
          Upcoming
        </p>
      </div>
    </div>
  );
};

export default NavigationAndSearch;
