import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAccountTree } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/about" className="text-2xl font-bold text-white flex items-center">
                            <MdAccountTree size={45} />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex sm:space-x-8">
                        <Link
                            to="/about"
                            className="text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                        >
                            About
                        </Link>
                        <Link
                            to="/visualizer"
                            className="text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                        >
                            Sorting Visualizer
                        </Link>
                        <Link
                            to="/searchVisualizer"
                            className="text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                        >
                            Search Visualizer
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className={`text-white focus:outline-none transition-transform duration-300 ${isOpen ? 'rotate-180 scale-110' : ''}`}
                        >
                            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Links with Fade-in Animation */}
            {isOpen && (
                <div className="sm:hidden bg-gradient-to-r from-purple-600 to-indigo-600 transition-opacity duration-500 ease-in-out">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/about"
                            onClick={toggleMenu}
                            className="block text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                        >
                            About
                        </Link>
                        <Link
                            to="/visualizer"
                            onClick={toggleMenu}
                            className="block text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                        >
                            Sorting Visualizer
                        </Link>
                        <Link
                            to="/searchVisualizer"
                            onClick={toggleMenu}
                            className="block text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                        >
                            Search Visualizer
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
