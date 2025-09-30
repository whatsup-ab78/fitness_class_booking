// frontend/src/context/NotificationContext.js

import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success', // can be 'success' or 'error'
    });

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });

        // Automatically hide the notification after 4 seconds
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 4000);
    };

    const value = {
        notification,
        showNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};