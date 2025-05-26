import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '@/context/AuthContext';
import {useRouter} from 'expo-router';
import {styles} from './styles';
import {API_URL} from '../../utils/config';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!identifier || !password) {
            Alert.alert('Error', 'Fill all fields');
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
                throw new Error('Credentials ok');
            }

            const data = await response.json();
            const token = data.access_token;

            await AsyncStorage.setItem('access_token', token);

            const userResponse = await fetch(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await userResponse.json();
            Alert.alert('Login OK');
            await login(identifier, password);
            router.push('/home');
        } catch (error) {
            console.error(error);
            Alert.alert('Login Error', 'Check your credentials');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Email or Username"
                placeholderTextColor="#555"
                onChangeText={setIdentifier}
                value={identifier}
                style={styles.input}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#555"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkContainer} onPress={() => router.push('/signup')}>
                <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
