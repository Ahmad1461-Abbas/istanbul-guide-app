import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const featuredTrips = [
  {
    id: "1",
    title: "Sunrise on the Bosphorus",
    subtitle: "4 landmarks • Scenic ferry route",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    title: "Ottoman Splendor",
    subtitle: "8 locations • Palaces & royal mosques",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=80",
  },
];

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Saved Trips</Text>
        <Text style={styles.subtitle}>
          Pick up where you left off and revisit your favorite journeys.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.heroRow}
        >
          {featuredTrips.map((trip) => (
            <View key={trip.id} style={styles.heroCard}>
              <Image source={{ uri: trip.image }} style={styles.heroImage} />
              <View style={styles.overlay} />
              <View style={styles.heroContent}>
                <Text style={styles.rating}>★ {trip.rating}</Text>
                <Text style={styles.heroTitle}>{trip.title}</Text>
                <Text style={styles.heroSubtitle}>{trip.subtitle}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>My Curated Lists</Text>

        {featuredTrips.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.listCard} activeOpacity={0.88}>
            <Image source={{ uri: trip.image }} style={styles.listImage} />
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{trip.title}</Text>
              <Text style={styles.listSubtitle}>{trip.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>More saved experiences coming soon</Text>
          <Text style={styles.infoText}>
            We will connect the detail screen to bookmarks later to populate this tab dynamically.
          </Text>
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
    marginBottom: 18,
  },

  heroRow: {
    paddingBottom: 18,
  },

  heroCard: {
    width: 285,
    height: 240,
    borderRadius: 28,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#dbe4ea",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.24)",
  },

  heroContent: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },

  rating: {
    color: "#fff7cc",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },

  heroSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 16,
  },

  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
  },

  listImage: {
    width: 82,
    height: 82,
    borderRadius: 18,
    marginRight: 14,
  },

  listContent: {
    flex: 1,
    paddingRight: 10,
  },

  listTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 6,
  },

  listSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748b",
  },

  chevron: {
    fontSize: 32,
    color: "#64748b",
    marginTop: -2,
  },

  infoCard: {
    marginTop: 14,
    backgroundColor: "#0f4c5c",
    borderRadius: 28,
    padding: 22,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 15,
    lineHeight: 24,
    color: "rgba(255,255,255,0.84)",
  },
});