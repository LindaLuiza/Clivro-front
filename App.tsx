import {View} from 'react-native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {AuthProvider} from '@/context/AuthContext';
import {NetworkProvider, useNetwork} from '@/context/NetworkContext';
import NoInternet from '@/components/NoInternet';

function Main() {
    const {isConnected} = useNetwork();

    if (!isConnected) {
        return <NoInternet/>;
    }

    return (
        <>
            <StatusBar style="auto"/>
            <Stack/>
        </>
    );
}

export default function App() {
    return (
        <View style={{flex: 1}}>
            <AuthProvider>
                <NetworkProvider>
                    <Main/>
                </NetworkProvider>
            </AuthProvider>
        </View>
    );
}
