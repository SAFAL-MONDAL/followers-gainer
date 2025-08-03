import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            SocialBoost
                        </Link>
                        
                        <div className="hidden md:flex space-x-6">
                            <NavLink 
                                to="/services" 
                                className={({ isActive }) => 
                                    `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`
                                }
                            >
                                Services
                            </NavLink>
                            {isAuthenticated && (
                                <NavLink 
                                    to="/dashboard" 
                                    className={({ isActive }) => 
                                        `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            )}
                            {isAdmin && (
                                <NavLink 
                                    to="/admin" 
                                    className={({ isActive }) => 
                                        `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`
                                    }
                                >
                                    Admin
                                </NavLink>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="hidden md:inline text-sm text-gray-600">
                                    Hi, {user.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;