import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {API_URL} from "../utils/config";

type AuthContextType = {
    user: any | null;
    token: string | null;
    login: (identifier: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('access_token');
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        };
        loadUserData();
    }, []);

    const login = async (identifier: string, password: string) => {
        if (!identifier || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            const formBody = new URLSearchParams();
            formBody.append('username', identifier);
            formBody.append('password', password);

            const response = await fetch(`${API_URL}/users/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody.toString(),
            });

            if (!response.ok) {
                throw new Error('Erro nas credenciais');
            }

            const data = await response.json();
            const accessToken = data.access_token;
            setToken(accessToken);
            await AsyncStorage.setItem('access_token', accessToken);

            const userResponse = await fetch(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const userData = await userResponse.json();
            setUser(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            Alert.alert('Login OK');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro de Login', 'Verifique suas credenciais');
        }
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};