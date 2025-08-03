export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4
    }).format(price);
};

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getPlatformColor = (platform) => {
    const colors = {
        youtube: 'bg-red-500',
        instagram: 'bg-pink-500',
        facebook: 'bg-blue-500',
        tiktok: 'bg-black',
        telegram: 'bg-blue-400'
    };
    return colors[platform.toLowerCase()] || 'bg-gray-500';
};

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};