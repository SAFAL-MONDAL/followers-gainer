import apiClient from './apiClient';

// Admin Services
export const adminGetAllOrders = async () => {
  try {
    const response = await apiClient.get('/admin/orders');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export const adminUpdateOrderStatus = async (orderId, status) => {
  try {
    const response = await apiClient.patch(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update order status');
  }
};

export const adminCreateService = async (serviceData) => {
  try {
    const response = await apiClient.post('/admin/services', serviceData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create service');
  }
};

export const adminUpdateService = async (serviceId, serviceData) => {
  try {
    const response = await apiClient.put(`/admin/services/${serviceId}`, serviceData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update service');
  }
};

export const adminDeleteService = async (serviceId) => {
  try {
    const response = await apiClient.delete(`/admin/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete service');
  }
};

export const adminGetAllUsers = async () => {
  try {
    const response = await apiClient.get('/admin/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

// Admin Dashboard Stats
export const adminGetDashboardStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
  }
};