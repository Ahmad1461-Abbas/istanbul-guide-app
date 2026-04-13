import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { MapItem } from "../types/map";

type Props = {
    item: MapItem;
    distanceKm?: string | null;
    onClose: () => void;
};

export default function LandmarkDetailCard({
    item,
    distanceKm,
    onClose,
}: Props) {
    const categoryColor = getCategoryColor(item.category);

    return (
        <View style={styles.wrapper}>
            <View style={styles.handle} />

            <View style={styles.headerRow}>
                <View style={styles.headerLeft}>
                    <View
                        style={[
                            styles.categoryBadge,
                            { backgroundColor: `${categoryColor}18` },
                        ]}
                    >
                        <View
                            style={[
                                styles.categoryDot,
                                { backgroundColor: categoryColor },
                            ]}
                        />
                        <Text style={[styles.categoryBadgeText, { color: categoryColor }]}>
                            {item.category}
                        </Text>
                    </View>

                    {!!item.period && (
                        <Text style={styles.periodText}>{item.period}</Text>
                    )}
                </View>

                <Pressable onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
            </View>

            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.metaRow}>
                {!!distanceKm && (
                    <View style={styles.metaPill}>
                        <Text style={styles.metaPillLabel}>Distance</Text>
                        <Text style={styles.metaPillValue}>{distanceKm} km</Text>
                    </View>
                )}

                {item.period ? (
                    <View style={styles.metaPill}>
                        <Text style={styles.metaPillLabel}>Period</Text>
                        <Text style={styles.metaPillValue} numberOfLines={1}>
                            {item.period}
                        </Text>
                    </View>
                ) : null}
            </View>

            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
}

function getCategoryColor(category: MapItem["category"]) {
    switch (category) {
        case "Mosque":
            return "#2563eb";
        case "Palace":
            return "#7c3aed";
        case "Museum":
            return "#059669";
        case "Historical Event":
            return "#dc2626";
        case "Monument":
            return "#d97706";
        default:
            return "#0f766e";
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "rgba(255,255,255,0.97)",
        borderRadius: 28,
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 18,
        shadowColor: "#0f172a",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 12,
        borderWidth: 1,
        borderColor: "#eef2f7",
    },

    handle: {
        alignSelf: "center",
        width: 52,
        height: 6,
        borderRadius: 999,
        backgroundColor: "#dbe3ea",
        marginBottom: 14,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },

    headerLeft: {
        flex: 1,
        paddingRight: 12,
    },

    categoryBadge: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 8,
    },

    categoryDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },

    categoryBadgeText: {
        fontSize: 12,
        fontWeight: "800",
    },

    periodText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#64748b",
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#f1f5f9",
        alignItems: "center",
        justifyContent: "center",
    },

    closeButtonText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#475569",
    },

    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: 14,
    },

    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 14,
    },

    metaPill: {
        minWidth: 120,
        backgroundColor: "#f8fafc",
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#eef2f7",
    },

    metaPillLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#64748b",
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    metaPillValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },

    description: {
        fontSize: 15,
        lineHeight: 23,
        color: "#334155",
    },
});