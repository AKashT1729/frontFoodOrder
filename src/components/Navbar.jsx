import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img src="src/assets/coffee-shop.png" alt="Logo" className="w-10 h-10 mr-2" />
          <span className={`text-xl font-semibold text-gray-900 ${searchOpen ? 'hidden' : 'block'} md:block`}>
            Coffea & The Beanstalk Cafe
          </span>
        </div>
        <div className="flex items-center">
          {searchOpen && (
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-2 py-1 mr-2"
              placeholder="Search..."
            />
          )}
          <i
            className="fas fa-search text-gray-600 cursor-pointer"
            onClick={toggleSearch}
          ></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;