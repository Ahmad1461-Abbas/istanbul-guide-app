import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { colors } from "../../constants/theme";

const groups = [
  ["Notifications", "Get travel reminders and landmark updates"],
  ["Location Access", "Improve nearby discoveries and route suggestions"],
  ["Dark Mode", "Reduce glare during evening exploration"],
  ["Privacy", "Manage stored activity and saved journeys"],
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Fine-tune the experience to stay calm, focused, and easy on the eyes.</Text>

        <View style={styles.card}>
          {groups.map(([label, desc], index) => (
            <View key={label} style={[styles.row, index === groups.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.rowLeft}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name={index === 0 ? "notifications-outline" : index === 1 ? "location-outline" : index === 2 ? "moon-outline" : "shield-checkmark-outline"}
                    size={18}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{label}</Text>
                  <Text style={styles.rowDesc}>{desc}</Text>
                </View>
              </View>
              <Switch value={index !== 3} trackColor={{ true: colors.primaryContainer, false: "#d7dbde" }} thumbColor={colors.white} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", letterSpacing: -0.8 },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 24 },
  card: { backgroundColor: colors.surface, borderRadius: 24, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 18, borderBottomWidth: 1, borderBottomColor: "#eff2f3" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1, paddingRight: 12 },
  iconWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#eef5f8", alignItems: "center", justifyContent: "center" },
  rowTitle: { color: colors.text, fontSize: 16, fontWeight: "800" },
  rowDesc: { color: colors.textMuted, fontSize: 13, lineHeight: 18, marginTop: 4 },
});
