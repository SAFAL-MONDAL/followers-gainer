import React, { useEffect, useState } from 'react';
import { adminGetAllOrders,  adminGetDashboardStats,adminUpdateService} from '../api/admin';
import OrderTable from '../components/admin/OrderTable';
import ServiceManagement from '../components/admin/ServiceManagement';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        if (activeTab === 'orders') {
            const loadOrders = async () => {
                try {
                    setLoading(true);
                    const data = await fetchAllOrders();
                    setOrders(data);
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            
            loadOrders();
        }
    }, [activeTab]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (err) {
            alert('Failed to update order status: ' + err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('services')}
                >
                    Services
                </button>
            </div>
            
            {activeTab === 'orders' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    {loading ? (
                        <p>Loading orders...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <OrderTable 
                            orders={orders} 
                            onStatusUpdate={handleStatusUpdate} 
                        />
                    )}
                </div>
            )}
            
            {activeTab === 'services' && (
                <ServiceManagement />
            )}
        </div>
    );
}

export default AdminDashboard;