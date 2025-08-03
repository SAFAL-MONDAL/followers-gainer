import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info', duration = 5000) => {
        const id = Date.now();
        const newNotification = { id, message, type };
        
        setNotifications(prev => [...prev, newNotification]);
        
        if (duration) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const value = {
        notifications,
        addNotification,
        removeNotification,
        notifySuccess: (message, duration) => addNotification(message, 'success', duration),
        notifyError: (message, duration) => addNotification(message, 'error', duration),
        notifyInfo: (message, duration) => addNotification(message, 'info', duration),
        notifyWarning: (message, duration) => addNotification(message, 'warning', duration)
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}