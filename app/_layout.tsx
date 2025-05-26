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
                <Stack.Screen name="home/index" options={{title: 'Home'}}/>
                <Stack.Screen name="clubs/index" options={{title: 'Clubs'}}/>
                <Stack.Screen name="club-configuration/[id]" options={{title: 'Club'}}/>
                <Stack.Screen name="new-club/index" options={{title: 'New Club'}}/>
            </Stack>
        </AuthProvider>
    );
}
