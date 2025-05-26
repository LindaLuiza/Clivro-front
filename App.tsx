import {View} from 'react-native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {AuthProvider} from "@/context/AuthContext";

export default function App() {
    return (
        <View style={{flex: 1}}>
            <AuthProvider>
                <StatusBar style="auto"/>
                <Stack/>
            </AuthProvider>
        </View>
    );
}

