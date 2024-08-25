import React, { useState } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`relative flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-teal-400 to-blue-500 text-white'} shadow-lg`}>
      <div className="navbar-logo text-3xl font-extrabold tracking-tight">
        Task
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className='text-2xl'>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={handleMenuToggle} className='md:hidden text-3xl'>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-8 mt-4 md:mt-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-transparent'} md:bg-transparent shadow-lg md:shadow-none w-full md:w-auto absolute md:relative top-16 md:top-auto right-0 p-4 md:p-0`}>
        <li className='cursor-pointer hover:text-gray-200 transition-colors duration-300'>
          <a href="#home">Home</a>
        </li>
        <li className='cursor-pointer hover:text-gray-200 transition-colors duration-300'>
          <a href="#tasks">Your Tasks</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
