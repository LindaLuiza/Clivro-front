import React, {useEffect, useMemo, useState} from "react";
import {Alert, Button, Pressable, ScrollView, Text, TextInput, View,} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {requestResponse} from "@/utils";
import {API_URL} from "@/utils/config";
import {useAuth} from "@/context/AuthContext";
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

export default function ClubDetailsScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const {token} = useAuth();
    const tokenAuth = token ?? "";

    const [club, setClub] = useState<Club | null>(null);
    const [owner, setOwner] = useState<User | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Club>>({});

    useEffect(() => {
        async function fetchClub() {
            try {
                const response = await requestResponse(
                    `${API_URL}/clubs/${encodeURIComponent(id)}`,
                    "GET"
                );
                const data = await response.json();
                setClub(data);
                setFormData({name: data.name, description: data.description});
                const responseOwner = await requestResponse(
                    `${API_URL}/users/${encodeURIComponent(data.owner_id)}`,
                    "GET"
                );
                const ownerData: User = await responseOwner.json();
                setOwner(ownerData);
            } catch (err) {
                Alert.alert("Error", "Failed getting club data");
            }
        }

        if (id) fetchClub();

        function handleMembers() {
            requestResponse(
                `${API_URL}/clubs/${encodeURIComponent(id)}/members`,
                "GET",
            )
                .then(async (response) => await response.json()).then((members) => {
                setMembers(members)
            })
                .catch(() => {
                    Alert.alert("Error", "Couldn't update club");
                });
        }

        handleMembers()
        sortMembers()
    }, [id]);

    function handleSave() {
        if (!formData.name || formData.description === undefined) return;

        const updateData = {
            name: formData.name,
            description: formData.description,
        };

        requestResponse(
            `${API_URL}/clubs/${encodeURIComponent(id)}`,
            "PUT",
            updateData,
            tokenAuth
        )
            .then(() => {
                if (club) {
                    const updatedClub = {...club, ...updateData, updatedAt: new Date().toISOString()};
                    setClub(updatedClub);
                }
                setIsEditing(false);
                Alert.alert("Success", "Club updated");
                router.replace("/clubs");
            })
            .catch(() => {
                Alert.alert("Error", "Couldn't update club");
            });
    }

    function handleDelete() {
        Alert.alert("Confirm exclusion", "Are you sure you want to delete it?", [
            {text: "Cancel", style: "cancel"},
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        await requestResponse(
                            `${API_URL}/clubs/${encodeURIComponent(id)}`,
                            "DELETE",
                            {},
                            tokenAuth
                        );
                        Alert.alert("Deleted", "Club deleted with success");
                        setClub(null);
                        router.replace("/clubs");
                    } catch (err) {
                        Alert.alert("Error", "Couldn't delete club");
                    }
                },
            },
        ]);
    }

    function sortMembers() {
        return setMembers((prevMembers) => prevMembers.sort(function (a, b) {
            if(a.users == null || b.users == null) return 1;
            const x = a.users?.name;
            const y = b.users?.name;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }));
    }

    function handleAddMember() {
        requestResponse(
            `${API_URL}/clubs/${encodeURIComponent(id)}/members`,
            "POST",
            {},
            tokenAuth
        ).then(async (response) => await response.json()).then((member: Member) => {
            setMembers((prevState) => [...prevState, member]);
        })
    }

    if (!club) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Club not found.</Text>
            </View>
        );
    }

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(new Date(dateString));
    };

    const ownerName = owner?.name ? owner.name : "";

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonsRow}>
                <Button
                    title={isEditing ? "Cancel" : "Edit"}
                    onPress={() => {
                        if (isEditing) {
                            setFormData({name: club.name, description: club.description});
                            setIsEditing(false);
                        } else {
                            setIsEditing(true);
                        }
                    }}
                />
                <Button title="Participate" color="grey" onPress={handleAddMember}/>
                <Button title="Delete" color="red" onPress={handleDelete}/>
            </View>

            {isEditing ? (
                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.name || ""}
                        onChangeText={(text) =>
                            setFormData((prev) => ({...prev, name: text}))
                        }
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.description?.toString() || ""}
                        onChangeText={(text) =>
                            setFormData((prev) => ({...prev, description: text}))
                        }
                    />

                    <Button title="Save" onPress={handleSave}/>
                </View>
            ) : (
                <View style={styles.details}>
                    <Text style={styles.title}>{club.name}</Text>
                    <Text>
                        <Text style={styles.bold}>Description</Text> {club.description}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Owner</Text> {ownerName}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Created at</Text> {formatDate(club.created_at)}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Updated at</Text> {formatDate(club.updated_at)}
                    </Text>
                </View>
            )}
            <View>
                <Text style={styles.bold}>Members</Text>
            </View>
            {members.length === 0 ? (
                <View>
                    <Text>No members registered</Text>
                </View>
            ) : (
                members.map((member) => (
                    <Pressable
                        key={member.users?.id}
                    >
                        <Text>{member.users?.name}</Text>
                    </Pressable>
                ))
            )}
        </ScrollView>
    );
}
