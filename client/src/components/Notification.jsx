import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const Notification = () => {
    const { notifications, removeNotification } = useNotifications();

    const getNotificationColor = (type) => {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'error': return 'bg-red-500';
            case 'warning': return 'bg-yellow-500';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    className={`${getNotificationColor(notification.type)} text-white px-4 py-2 rounded shadow-lg flex justify-between items-center min-w-64`}
                >
                    <span>{notification.message}</span>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="ml-4 text-white hover:text-gray-200"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;