import React, { useState } from 'react';
import { Menu, Search, Sun, Moon, MoreVertical } from 'lucide-react';

const Navbar = ({ toggleSidebar, toggleDarkMode }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toggleDarkMode();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white text-black">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <span className="font-bold text-xl">Logo</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={handleSearchClick}>
            <Search className="w-6 h-6 text-black" />
          </button>
          {searchVisible && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute top-0 left-0 mt-8 p-2 bg-white text-black rounded-md shadow-md"
            />
          )}
        </div>
        <button>
          <MoreVertical className="w-6 h-6 text-black" />
        </button>
        <button onClick={handleDarkModeToggle}>
          {darkMode ? <Sun className="w-6 h-6 text-black" /> : <Moon className="w-6 h-6 text-black" />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;