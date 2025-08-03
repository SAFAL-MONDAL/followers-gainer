import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useServices } from '../context/ServiceContext';
import { useNotifications } from '../context/NotificationContext';
import { createOrder } from '../api/orders';
import OrderForm from '../components/OrderForm';

function Order() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { services, getServicesByPlatform } = useServices();
    const { notifySuccess, notifyError } = useNotifications();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const findService = () => {
            if (services.length > 0) {
                const foundService = services.find(s => s._id === id);
                if (foundService) {
                    setService(foundService);
                } else {
                    notifyError('Service not found');
                    navigate('/services');
                }
                setLoading(false);
            }
        };

        findService();
    }, [id, services, navigate, notifyError]);

    const handleOrderSubmit = async (orderData) => {
        if (!user) {
            navigate('/login', { state: { from: `/order/${id}` } });
            return;
        }

        try {
            await createOrder({
                serviceId: id,
                ...orderData
            });
            notifySuccess('Order placed successfully!');
            navigate('/dashboard');
        } catch (err) {
            notifyError(err.message || 'Failed to place order');
        }
    };

    if (loading) return <div className="text-center py-12">Loading service details...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>
                
                {service && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <div className={`w-3 h-8 ${getPlatformColor(service.platform)} rounded mr-3`}></div>
                            <h2 className="text-xl font-semibold">{service.title}</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-2">Service Details</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><span className="font-medium">Platform:</span> {service.platform}</li>
                                    <li><span className="font-medium">Category:</span> {service.category}</li>
                                    <li><span className="font-medium">Quantity Range:</span> {service.minQuantity} - {service.maxQuantity}</li>
                                    <li>
                                        <span className="font-medium">Price:</span> ${service.pricePerUnit.toFixed(4)}/unit
                                        {service.discount > 0 && (
                                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                {service.discount}% OFF
                                            </span>
                                        )}
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <OrderForm 
                                    service={service} 
                                    onSubmit={handleOrderSubmit} 
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Order;