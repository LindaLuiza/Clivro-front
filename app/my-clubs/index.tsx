import React, {useEffect, useMemo, useState} from "react";
import {NavBar} from "@/components/Navigation";
import {requestResponse} from "@/utils";
import {API_URL} from "@/utils/config";
import {useAuth} from "@/context/AuthContext";
import {router} from "expo-router";
import {Alert, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {styles} from "./styles"

type Club = {
    id: string;
    name: string;
    description: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
};
type User = {
    id: string;
    name: string;
    email: string;
    username: string;
    hashed_password: string;
    created_at: string;
    updated_at: string;
}
type Member = {
    id: string;
    club_id: string;
    user_id: string;
    registered_at: string;
    clubs: Club | null;
    users: User | null;
}


export default function ClubsPage() {
    const {token} = useAuth();
    const tokenAuth = token ?? "";
    const [clubs, setClubs] = useState<Club[]>([]);
    const [search, setSearch] = useState("");

    const filteredClubs = useMemo(() => {
        return clubs.filter((club) =>
            club.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [clubs, search]);

    async function getClubs() {
        const listClubsUrl = `${API_URL}/clubs/my-clubs`;
        const clubsResponse = await requestResponse(listClubsUrl, "GET", {}, tokenAuth);
        return await clubsResponse.json();
    }

    useEffect(() => {
        const fetchClubs = async () => {
            const clubs: Club[] = await getClubs();
            setClubs(clubs);
        };
        fetchClubs();
    }, []);

    const navigateToClubDetail = (clubId: string) => {
        router.push({
            pathname: "/club-configuration/[id]",
            params: {id: clubId.toString()},
        });
    };

    function handleQuitClub(club_id: string) {
        requestResponse(
            `${API_URL}/clubs/${club_id}/members/user`,
            "GET",
            {},
            tokenAuth
        )
            .then((response) => response.json())
            .then((member: Member | null) => {
                if (!member) {
                    Alert.alert("Error", "You are not a member of this club.");
                    return;
                }

                Alert.alert("Quit Club", "Are you sure you want to quit this club?", [
                    {text: "Cancel", style: "cancel"},
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                            quitClub(club_id, member.id);
                        }
                    },
                ]);
            })
            .catch(() => {
                Alert.alert("Error", "Failed to fetch membership.");
            });
    }

    async function quitClub(club_id: string, member_id: string) {
        try {
            await requestResponse(
                `${API_URL}/clubs/${club_id}/members/${member_id}`,
                "DELETE",
                {},
                tokenAuth
            );
            Alert.alert("Deleted", "Club deleted successfully");
            router.replace("/clubs");
        } catch (err) {
            Alert.alert("Error", "Couldn't delete club");
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search club by name..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
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
                            <View key={club.id} style={styles.tableRow}>
                                <Pressable
                                    style={styles.clubInfo}
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

                                <Pressable onPress={() => handleQuitClub(club.id)} style={styles.quitButton}>
                                    <Text style={styles.quitButtonText}>Quit</Text>
                                </Pressable>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

            <NavBar/>
        </View>
    );
}

