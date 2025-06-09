import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    addButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
        backgroundColor: '#0070f3',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    tableContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: '#fff',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableCell: {
        fontSize: 16,
    },
    italicText: {
        fontStyle: 'italic',
        color: '#777',
    },
    noResults: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    clubInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    quitButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#fdd',
        marginLeft: 10,
    },
    quitButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
