import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token with backend or decode it
                    const response = await apiClient.get('/auth/verify');
                    setUser(response.data.user);
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        
        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}