import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '@/context/AuthContext';
import {useRouter} from 'expo-router';
import {styles} from './styles';

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

            const response = await fetch('http://177.143.186.29:9999/token', {
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

            const userResponse = await fetch('http://177.143.186.29:9999/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = await userResponse.json();
            Alert.alert('Login OK');
            router.push('/');
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
                onChangeText={setIdentifier}
                value={identifier}
                style={styles.input}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
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
