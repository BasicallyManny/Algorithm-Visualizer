import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdAccountTree } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when changing routes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Check if route is active
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
            scrolled 
                ? 'bg-gray-900 shadow-lg' 
                : 'bg-gray-900'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <Link to="/about" className="text-2xl font-bold text-white flex items-center">
                            <MdAccountTree size={32} className="text-teal-400" />
                            <span className="ml-2 hidden md:block font-bold text-white">
                                Algorithm Visualizer
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex sm:space-x-4">
                        <NavLink to="/about" active={isActive('/about')}>
                            <FaInfo className="mr-2" />
                            <span>About</span>
                        </NavLink>
                        <NavLink to="/visualizer" active={isActive('/visualizer')}>
                            <FaSortAmountDown className="mr-2" />
                            <span>Sorting</span>
                        </NavLink>
                        <NavLink to="/searchVisualizer" active={isActive('/searchVisualizer')}>
                            <FaSearch className="mr-2" />
                            <span>Search</span>
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className="text-white p-2"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-56" : "max-h-0"
                }`}
            >
                <div className="px-2 py-3 space-y-1 bg-gray-800">
                    <MobileNavLink to="/about" active={isActive('/about')}>
                        <FaInfo className="mr-3" size={16} />
                        <span>About</span>
                    </MobileNavLink>
                    <MobileNavLink to="/visualizer" active={isActive('/visualizer')}>
                        <FaSortAmountDown className="mr-3" size={16} />
                        <span>Sorting Visualizer</span>
                    </MobileNavLink>
                    <MobileNavLink to="/searchVisualizer" active={isActive('/searchVisualizer')}>
                        <FaSearch className="mr-3" size={16} />
                        <span>Search Visualizer</span>
                    </MobileNavLink>
                </div>
            </div>
        </nav>
    );
};

// Desktop navigation link component
interface NavLinkProps {
    to: string;
    active: boolean;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
    <Link 
        to={to}
        className={`flex items-center px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${
            active 
                ? 'bg-teal-500 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
    >
        {children}
    </Link>
);

// Mobile navigation link component
interface MobileNavLinkProps {
    to: string;
    active: boolean;
    children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, active, children }) => (
    <Link 
        to={to}
        className={`flex items-center py-2 px-3 rounded-md text-base font-medium ${
            active 
                ? 'bg-teal-500 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {children}
    </Link>
);

export default Navbar;