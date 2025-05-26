import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    submitButton: {
        paddingVertical: 12,
        borderRadius: 4,
        backgroundColor: "#0070f3",
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
    },
});