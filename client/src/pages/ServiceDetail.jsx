import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchService } from '../api/services';
import OrderForm from '../components/OrderForm';
import { useAuth } from '../context/AuthContext';

function ServiceDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getService = async () => {
            try {
                setLoading(true);
                const data = await fetchService(id);
                setService(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        getService();
    }, [id]);

    const handleOrderSubmit = async (orderData) => {
        if (!user) {
            navigate('/login', { state: { from: `/service/${id}` } });
            return;
        }
        
        try {
            // Submit order to backend
            const response = await createOrder({
                serviceId: id,
                ...orderData
            });
            
            navigate('/dashboard');
        } catch (err) {
            alert('Failed to create order: ' + err.message);
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!service) return <div className="text-center py-8">Service not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold">{service.title}</h1>
                            <p className="text-gray-600 mt-2">{service.platform} • {service.category}</p>
                        </div>
                        {service.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                                -{service.discount}%
                            </span>
                        )}
                    </div>
                    
                    <p className="mt-4 text-gray-700">{service.description}</p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                            <div className="space-y-3">
                                <p><span className="font-medium">Quantity Range:</span> {service.minQuantity} - {service.maxQuantity}</p>
                                <p><span className="font-medium">Price:</span> ${service.pricePerUnit.toFixed(4)} per unit</p>
                                {service.discount && (
                                    <p className="text-green-600">
                                        <span className="font-medium">Discounted Price:</span> ${(service.pricePerUnit * (1 - service.discount / 100)).toFixed(4)} per unit
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Place Order</h2>
                            <OrderForm 
                                service={service} 
                                onSubmit={handleOrderSubmit} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;