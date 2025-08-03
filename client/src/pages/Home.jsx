import React from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';
import { getPlatformColor } from '../utils/helpers';

function Home() {
    const { featuredServices, loading, error } = useServices();
    const { isAuthenticated } = useAuth();

    if (loading) return <div className="text-center py-12">Loading featured services...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Boost Your Social Media Presence</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Get real followers, likes, and views for YouTube, Instagram, Facebook, and more
                </p>
                {!isAuthenticated ? (
                    <div className="space-x-4">
                        <Link 
                            to="/register" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Get Started
                        </Link>
                        <Link 
                            to="/login" 
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Login
                        </Link>
                    </div>
                ) : (
                    <Link 
                        to="/services" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Browse Services
                    </Link>
                )}
            </section>

            {/* Featured Services */}
            <section className="py-8">
                <h2 className="text-2xl font-bold mb-6">Featured Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredServices.map(service => (
                        <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-200">
                            <div className={`h-2 ${getPlatformColor(service.platform)}`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                        {service.platform}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{service.category}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">
                                        ${(service.pricePerUnit * (1 - (service.discount || 0) / 100)).toFixed(4)}/unit
                                    </span>
                                    <Link 
                                        to={`/service/${service._id}`} 
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link 
                        to="/services" 
                        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200"
                    >
                        View All Services
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-gray-50 rounded-lg my-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Services?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">High Quality</h3>
                            <p className="text-gray-600 text-sm">Premium services with real engagement</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600 text-sm">Most orders start within minutes</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Secure Payments</h3>
                            <p className="text-gray-600 text-sm">Your information is always safe</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;