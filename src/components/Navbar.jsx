import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search, Sun, Moon, List, LayoutGrid, Menu } from 'lucide-react';
import { setSearchQuery } from '../redux/taskSlice';

const Navbar = ({ toggleSidebar, toggleDarkMode, toggleViewMode, isCardView, darkMode }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-[#2d2c2d] text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <Menu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
        </button>
        <span className="font-bold text-xl" style={{ color: darkMode ? '#39743b' : 'inherit' }}>Logo</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={handleSearchClick}>
            <Search className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
          </button>
          {searchVisible && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className={`absolute top-0 left-[-220px] mt-0 p-2 ${darkMode ? 'bg-[#222223] text-white' : 'bg-white text-black'} rounded-md shadow-md`}
              style={{ width: '200px' }}
            />
          )}
        </div>
        <button onClick={toggleViewMode}>
          {isCardView ? <List className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} /> : <LayoutGrid className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />}
        </button>
        <button onClick={toggleDarkMode}>
          {darkMode ? <Sun className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} /> : <Moon className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;