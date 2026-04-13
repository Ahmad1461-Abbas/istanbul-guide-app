// components/MyLocationButton.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    onPress: () => void;
};

export default function MyLocationButton({ onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>📍</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        right: 16,
        bottom: 110,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#d1d5db",
        elevation: 4,
    },
    buttonText: {
        fontSize: 22,
    },
});