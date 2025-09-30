import React, { createContext, useState, useContext, useEffect } from 'react';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // New state to track initial auth check

    useEffect(() => {
        const loadUser = () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setAuthToken(storedToken); // Set auth token for all axios requests
            }
            setLoading(false); // Auth check is complete
        };

        loadUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));
        setToken(userData.token);
        setUser(userData.user);
        setAuthToken(userData.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setAuthToken(null); // Clear auth token
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};