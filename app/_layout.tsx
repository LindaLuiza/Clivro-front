import {Stack} from 'expo-router';
import {AuthProvider} from '@/context/AuthContext';
import {StatusBar} from 'expo-status-bar';

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="auto"/>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="login/index" options={{title: 'Login'}}/>
                <Stack.Screen name="signup/index" options={{title: 'Signup'}}/>
            </Stack>
        </AuthProvider>
    );
}
