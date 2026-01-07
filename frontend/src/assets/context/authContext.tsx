import React, { createContext, useState, useEffect, useContext} from 'react';
import type { User, AuthContextType } from '../types/userTypes';
import { getMe, loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getMe();
                    setUser(userData);
                } catch (error) {
                    console.error('Błąd podczas pobierania danych użytkownika:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);
    
    const login = async(credentials: any) => {
        try {
            const userData = await loginUser(credentials);
            setUser(userData.user);
        } catch (error) {
            throw error;
        }
    };  
    
    const register = async(userData: any) => {
        try {
            const registeredData = await registerUser(userData);
            setUser(registeredData.user);
        } catch (error) {
            throw error;
        }
    };
    const handleLogout = () => {
        logoutUser();
        setUser(null);
    };

    return (
    <AuthContext.Provider value={{
        user,
        isAuthenticated: !!user,
        isLoading: loading,
        login,
        register,
        logout: handleLogout
    }}>
        {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth musi być użyty wewnątrz AuthProvider");
  return context;
};