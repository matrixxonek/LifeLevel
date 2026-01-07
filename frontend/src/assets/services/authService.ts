import api from "../api/axios";

export const registerUser = async (credentials: any) => {
    const response = await api.post('/auth/register', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const loginUser = async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};