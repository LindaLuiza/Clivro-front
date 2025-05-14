import {View, Text} from 'react-native';
import {Stack} from 'expo-router'; // A Stack é uma configuração comum de navegação.
import {StatusBar} from 'expo-status-bar';
import {AuthProvider} from "@/context/AuthContext";

export default function App() {
    return (
        <View style={{flex: 1}}>
            <AuthProvider>
                <StatusBar style="auto"/>
                <Stack/> {/* O Stack é um wrapper que lida com a navegação */}
            </AuthProvider>
        </View>
    );
}

