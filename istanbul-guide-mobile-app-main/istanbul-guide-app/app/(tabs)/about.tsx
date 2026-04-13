import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>About</Text>

        <View style={styles.card}>
          <Text style={styles.text}>
            This application is part of the Istanbul Smart Tourism Guide project.
            It helps users explore historical landmarks, monuments, museums,
            mosques, palaces, and important historical places through an
            interactive map-based interface.
          </Text>

          <Text style={styles.text}>
            The application was developed using React Native and Expo, with a
            focus on usability, location-based exploration, and organized screen
            navigation.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16,
    paddingTop: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
  },

  text: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 12,
  },
});