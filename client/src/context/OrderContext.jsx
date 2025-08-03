import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserOrders } from '../api/orders';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const loadOrders = async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            const data = await fetchUserOrders();
            setOrders(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [user]);

    const getOrderById = (id) => {
        return orders.find(order => order._id === id);
    };

    const value = {
        orders,
        loading,
        error,
        getOrderById,
        refreshOrders: loadOrders
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    return useContext(OrderContext);
}