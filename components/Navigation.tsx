import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {RelativePathString, useRouter} from "expo-router";

type NavButtonProps = {
    label: string;
    route: string;
};

const NavButton = ({label, route}: NavButtonProps) => {
    const router = useRouter()
    const routePath = route as RelativePathString

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push(routePath)}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
};

export const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <NavButton label="Feed" route="/home"/>
            <NavButton label="Clubs" route="/clubs"/>
            <NavButton label="New" route="/new-post"/>
            <NavButton label="Search" route="/search"/>
            <NavButton label="Profile" route="/profile"/>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#f1f1f1",
        paddingVertical: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 16,
        color: "#007aff",
    },
});
