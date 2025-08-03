import apiClient from './apiClient';

export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create order');
    }
};

export const fetchUserOrders = async () => {
    try {
        const response = await apiClient.get('/orders/user');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
};