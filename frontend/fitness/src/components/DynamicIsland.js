// frontend/src/components/DynamicIsland.js

import React from 'react';
import { useNotification } from '../context/NotificationContext';

function DynamicIsland() {
    const { notification } = useNotification();
    const { show, message, type } = notification;

    // Dynamically set classes for visibility and color
    const islandClass = show ? 'island-visible' : '';
    const backgroundClass = type === 'success' ? 'bg-success' : 'bg-danger';

    return (
        <div className={`dynamic-island ${islandClass}`}>
            <div className={`dynamic-island-content ${backgroundClass}`}>
                <div className="icon">
                    {type === 'success' ? <i className="fas fa-check-circle"></i> : <i className="fas fa-times-circle"></i>}
                </div>
                <div className="message">{message}</div>
            </div>
        </div>
    );
}

export default DynamicIsland;