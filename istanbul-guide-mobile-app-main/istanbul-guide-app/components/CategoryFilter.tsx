import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapCategory } from "../types/map";

type Props = {
    selectedCategory: MapCategory | "All";
    onSelectCategory: (category: MapCategory | "All") => void;
};

const categories: (MapCategory | "All")[] = [
    "All",
    "Mosque",
    "Palace",
    "Museum",
    "Historical Event",
    "Monument",
];

export default function CategoryFilter({
    selectedCategory,
    onSelectCategory,
}: Props) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => {
                    const isActive = selectedCategory === category;

                    return (
                        <TouchableOpacity
                            key={category}
                            style={[styles.button, isActive && styles.activeButton]}
                            onPress={() => onSelectCategory(category)}
                        >
                            <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: "#e5e7eb",
        marginRight: 8,
    },
    activeButton: {
        backgroundColor: "#111827",
    },
    buttonText: {
        color: "#111827",
        fontWeight: "500",
    },
    activeButtonText: {
        color: "#ffffff",
    },
});