import React, {useState} from "react";
import {useRouter} from "expo-router";
import {Alert, Pressable, Text, TextInput, View} from "react-native";
import {useAuth} from "@/context/AuthContext";
import {requestResponse} from "@/utils";
import {API_URL} from "@/utils/config";
import {styles} from "./styles";

export default function AddClubPage() {
    const router = useRouter();
    const {token} = useAuth();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert.alert("Name is required.");
            return;
        }

        const newClub = {name: name.trim(), description: description.trim() || undefined};

        try {
            const response = await requestResponse(
                `${API_URL}/clubs`,
                "POST",
                newClub,
                token || ""
            );

            if (response.ok) {
                Alert.alert("Club created successfully");
                router.back();
            } else {
                Alert.alert("Error", "Failed to create club");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Description (optional)"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Create Club</Text>
            </Pressable>
        </View>
    );
}


