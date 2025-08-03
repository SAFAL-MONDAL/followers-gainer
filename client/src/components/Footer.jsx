import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">SocialBoost</h3>
                        <p className="text-gray-400 text-sm">
                            Boost your social media presence with our high-quality services.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-md font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/services/youtube" className="hover:text-white">YouTube</Link></li>
                            <li><Link to="/services/instagram" className="hover:text-white">Instagram</Link></li>
                            <li><Link to="/services/facebook" className="hover:text-white">Facebook</Link></li>
                            <li><Link to="/services/tiktok" className="hover:text-white">TikTok</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-md font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-md font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                            <li><Link to="/status" className="hover:text-white">Service Status</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
                    <p>&copy; {new Date().getFullYear()} SocialBoost. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;