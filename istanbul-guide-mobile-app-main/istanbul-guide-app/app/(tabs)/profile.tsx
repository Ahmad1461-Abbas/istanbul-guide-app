import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii } from "../../constants/theme";

const rows = [
  ["Travel Style", "Slow, cultural, editorial"],
  ["Saved Places", "26"],
  ["Completed Routes", "7"],
  ["Preferred Categories", "Mosques, bazaars, museums"],
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Asad Ullah Baig</Text>
          <Text style={styles.subtitle}>Curating calm, story-rich walks across Istanbul.</Text>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}><Text style={styles.statValue}>26</Text><Text style={styles.statLabel}>Saved</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>7</Text><Text style={styles.statLabel}>Trips</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>14</Text><Text style={styles.statLabel}>Reviews</Text></View>
        </View>

        <View style={styles.infoCard}>
          {rows.map(([label, value]) => (
            <View key={label} style={styles.infoRow}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </View>
          ))}
        </View>

        <Pressable style={styles.settingsButton} onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={18} color={colors.white} />
          <Text style={styles.settingsButtonText}>Open Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 16 },
  header: { alignItems: "center", paddingTop: 12, marginBottom: 22 },
  avatar: { width: 108, height: 108, borderRadius: 54, marginBottom: 14 },
  name: { color: colors.text, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 },
  subtitle: { color: colors.textMuted, marginTop: 8, fontSize: 15, lineHeight: 22, textAlign: "center", maxWidth: 300 },
  statGrid: { flexDirection: "row", gap: 12, marginBottom: 18 },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radii.lg, paddingVertical: 18, alignItems: "center" },
  statValue: { color: colors.primary, fontSize: 24, fontWeight: "900" },
  statLabel: { color: colors.textMuted, fontSize: 12, fontWeight: "600", marginTop: 4 },
  infoCard: { backgroundColor: colors.surface, borderRadius: 24, overflow: "hidden" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 18, borderBottomWidth: 1, borderBottomColor: "#eef2f4" },
  infoLabel: { color: colors.textMuted, fontSize: 13, fontWeight: "600" },
  infoValue: { color: colors.text, fontSize: 16, fontWeight: "800", marginTop: 4 },
  settingsButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  settingsButtonText: { color: colors.white, fontWeight: "800", fontSize: 15 },
});
