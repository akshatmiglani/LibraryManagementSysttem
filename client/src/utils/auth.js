// src/utils/auth.js
import { jwtDecode } from 'jwt-decode'; // Use named import

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role;
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    try {
        jwtDecode(token);
        return true;
    } catch (error) {
        return false;
    }
};
