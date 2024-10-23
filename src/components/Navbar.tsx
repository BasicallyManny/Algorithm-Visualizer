import React from 'react';
import { Link } from 'react-router-dom';
import { MdAccountTree } from "react-icons/md";


const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/about" className="text-2xl font-bold text-white">
                            <MdAccountTree size={45}/>
                        </Link>
                    </div>

                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                        {/* Tabs */}
                        <Link
                            to="/about"
                            className="text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold flex items-center"
                        >
                            About
                        </Link>
                        <Link
                            to="/visualizer"
                            className="text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold flex items-center"
                        >
                            Sorting Visualizer
                        </Link>
                        <Link
                            to="/searchVisualizer"
                            className="text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold flex items-center"
                        >
                            Search Visualizer
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link
                        to="/about"
                        className="block text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                    >
                        About
                    </Link>
                    <Link
                        to="/visualizer"
                        className="block text-white hover:bg-purple-700 hover:text-gray-100 px-3 py-2 rounded-md text-lg font-extrabold"
                    >
                        Visualizer
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
