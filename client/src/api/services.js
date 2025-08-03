import apiClient from './apiClient';

export const fetchServices = async (platform = null) => {
    try {
        const endpoint = platform ? `/services?platform=${platform}` : '/services';
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch services');
    }
};

export const fetchService = async (id) => {
    try {
        const response = await apiClient.get(`/services/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch service');
    }
};

export const createService = async (serviceData) => {
    try {
        const response = await apiClient.post('/admin/services', serviceData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create service');
    }
};