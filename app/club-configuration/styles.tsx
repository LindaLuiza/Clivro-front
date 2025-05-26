import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
        backgroundColor: "#fff",
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    details: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold",
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontWeight: "600",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 8,
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 40,
    },
});