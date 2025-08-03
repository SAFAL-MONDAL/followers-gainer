// src/utils/helpers.js

/**
 * Formats a price as USD currency with 4 decimal places
 * @param {number} price - The price to format
 * @returns {string} Formatted currency string
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4
    }).format(price);
};

/**
 * Capitalizes the first letter of a string and makes the rest lowercase
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Gets the Tailwind CSS background color class for a social platform
 * @param {string} platform - The platform name (e.g., 'youtube')
 * @returns {string} Tailwind background color class
 */
export const getPlatformColor = (platform) => {
    const colors = {
        youtube: 'bg-red-500',
        instagram: 'bg-pink-500',
        facebook: 'bg-blue-500',
        tiktok: 'bg-black',
        telegram: 'bg-blue-400',
        twitter: 'bg-blue-400', // Added Twitter
        linkedin: 'bg-blue-600' // Added LinkedIn
    };
    return colors[platform.toLowerCase()] || 'bg-gray-500';
};

/**
 * Truncates a string with ellipsis if it exceeds the specified length
 * @param {string} str - The string to truncate
 * @param {number} n - Maximum length before truncation
 * @returns {string} Truncated string if needed
 */
export const truncate = (str, n) => {
    if (!str) return '';
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

/**
 * Formats a date string into a readable format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatDate = (date) => {
    if (!date) return '';
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Generates a random unique ID
 * @returns {string} Random ID string
 */
export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
};