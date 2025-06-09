import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NoInternet() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sem conexão com a internet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8d7da',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#721c24',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
