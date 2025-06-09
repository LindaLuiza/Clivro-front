import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

type NetworkContextType = {
    isConnected: boolean;
};

type NetworkProviderProps = {
  children: ReactNode;
};

const NetworkContext = createContext<NetworkContextType>({isConnected: true});

export const NetworkProvider = ({ children }: NetworkProviderProps) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(!!state.isConnected && !!state.isInternetReachable);
        });
        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{isConnected}}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => useContext(NetworkContext);
