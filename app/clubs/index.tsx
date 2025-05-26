import React, {useEffect, useMemo, useState} from "react";
import {NavBar} from "@/components/Navigation";
import {requestResponse} from "@/utils";
import {API_URL} from "@/utils/config";
import {useAuth} from "@/context/AuthContext";
import {RelativePathString, router} from "expo-router";
import {Alert, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {styles} from "./styles"

type Club = {
    id: number;
    name: string;
    description?: string;
};

export default function ClubsPage() {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [search, setSearch] = useState("");

    const filteredClubs = useMemo(() => {
        return clubs.filter((club) =>
            club.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [clubs, search]);

    async function getClubs() {
        const listClubsUrl = `${API_URL}/clubs`;
        const clubsResponse = await requestResponse(listClubsUrl, "GET");
        return await clubsResponse.json();
    }

    useEffect(() => {
        const fetchClubs = async () => {
            const clubs = await getClubs();
            setClubs(clubs);
        };

        fetchClubs();
    }, []);

    const navigateToClubDetail = (clubId: number) => {
        router.push({
            pathname: "/club-configuration/[id]",
            params: {id: clubId.toString()},
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search club by name..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />

                <Pressable
                    style={styles.addButton}
                    onPress={() => router.push("/new-club" as RelativePathString)}
                >
                    <Text style={styles.addButtonText}>Add Club</Text>
                </Pressable>
            </View>

            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, {flex: 2}]}>Name</Text>
                    <Text style={[styles.headerCell, {flex: 3}]}>Description</Text>
                </View>

                <ScrollView>
                    {filteredClubs.length === 0 ? (
                        <View style={styles.noResults}>
                            <Text>No club found.</Text>
                        </View>
                    ) : (
                        filteredClubs.map((club) => (
                            <Pressable
                                key={club.id}
                                style={styles.tableRow}
                                onPress={() => navigateToClubDetail(club.id)}
                            >
                                <Text style={[styles.tableCell, {flex: 2}]}>{club.name}</Text>
                                <Text
                                    style={[
                                        styles.tableCell,
                                        {flex: 3},
                                        !club.description && styles.italicText,
                                    ]}
                                >
                                    {club.description || "—"}
                                </Text>
                            </Pressable>
                        ))
                    )}
                </ScrollView>
            </View>

            <NavBar/>
        </View>
    );
}

