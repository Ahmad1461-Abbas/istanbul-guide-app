import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#083344", "#155e75", "#0f3c4c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.eyebrow}>ISTANBUL SMART TOURISM GUIDE</Text>
        <Text style={styles.title}>Travel through Istanbul with a calmer, smarter guide.</Text>
        <Text style={styles.subtitle}>
          Explore landmarks, cultural history, nearby places, and curated journeys
          in one clean experience.
        </Text>

        <View style={styles.buttonStack}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.9}
            onPress={() => router.replace("/(tabs)/explore")}
          >
            <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f4",
    padding: 16,
  },
  hero: {
    flex: 1,
    borderRadius: 34,
    padding: 24,
    justifyContent: "space-between",
  },
  eyebrow: {
    color: "#f4e2c0",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2.4,
  },
  title: {
    fontSize: 38,
    lineHeight: 46,
    color: "#ffffff",
    fontWeight: "800",
    marginTop: 24,
  },
  subtitle: {
    color: "#d6e5e9",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 16,
  },
  buttonStack: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#d8b15e",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#0f3340",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
