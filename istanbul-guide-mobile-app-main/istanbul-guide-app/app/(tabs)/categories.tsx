import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { historicalPlaces } from "../../constants/historicalPlaces";

export default function CategoriesScreen() {
  const categories = [...new Set(historicalPlaces.map((place) => place.category))];

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: "/",
      params: { category },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>
          Browse Istanbul’s historical places by theme and open them directly on the map.
        </Text>

        <View style={styles.grid}>
          {categories.map((category, index) => {
            const highlighted = index % 2 === 1;

            return (
              <TouchableOpacity
                key={category}
                style={[styles.card, highlighted && styles.cardHighlighted]}
                activeOpacity={0.88}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={[styles.iconWrap, highlighted && styles.iconWrapHighlighted]}>
                  <Text style={[styles.icon, highlighted && styles.iconHighlighted]}>◈</Text>
                </View>

                <Text style={[styles.cardTitle, highlighted && styles.cardTitleHighlighted]}>
                  {category}
                </Text>

                <Text style={[styles.cardText, highlighted && styles.cardTextHighlighted]}>
                  View {category.toLowerCase()} locations on the map
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 120,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 24,
    marginBottom: 22,
  },

  grid: {
    gap: 16,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    minHeight: 170,
    justifyContent: "flex-end",
  },

  cardHighlighted: {
    backgroundColor: "#0f4c5c",
  },

  iconWrap: {
    position: "absolute",
    top: 24,
    left: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapHighlighted: {
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  icon: {
    fontSize: 22,
    color: "#0f4c5c",
    fontWeight: "700",
  },

  iconHighlighted: {
    color: "#ffffff",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },

  cardTitleHighlighted: {
    color: "#ffffff",
  },

  cardText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
  },

  cardTextHighlighted: {
    color: "rgba(255,255,255,0.82)",
  },
});