import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchServices } from '../api/services';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
    const [services, setServices] = useState([]);
    const [featuredServices, setFeaturedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadServices = async () => {
        try {
            setLoading(true);
            const data = await fetchServices();
            setServices(data);
            
            // Set featured services (first 6 or based on some logic)
            setFeaturedServices(data.slice(0, 6));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getServicesByPlatform = (platform) => {
        return services.filter(service => 
            service.platform.toLowerCase() === platform.toLowerCase()
        );
    };

    useEffect(() => {
        loadServices();
    }, []);

    const value = {
        services,
        featuredServices,
        loading,
        error,
        getServicesByPlatform,
        refreshServices: loadServices
    };

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    );
}

export function useServices() {
    return useContext(ServiceContext);
}