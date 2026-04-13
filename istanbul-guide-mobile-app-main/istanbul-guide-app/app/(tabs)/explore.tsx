import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { historicalPlaces } from "../../constants/historicalPlaces";
import { MapCategory } from "../../types/map";

const categories: MapCategory[] = [
  "Mosque",
  "Palace",
  "Museum",
  "Historical Event",
  "Monument",
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return historicalPlaces.slice(0, 6);
    }

    return historicalPlaces
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.period ?? "").toLowerCase().includes(query)
        );
      })
      .slice(0, 8);
  }, [searchQuery]);

  const openMap = () => {
    router.push("/");
  };

  const openCategoryOnMap = (category: MapCategory) => {
    router.push({
      pathname: "/",
      params: { category },
    });
  };

  const openPlaceOnMap = (item: {
    title: string;
    latitude: number;
    longitude: number;
  }) => {
    router.push({
      pathname: "/",
      params: {
        focusTitle: item.title,
        focusLat: String(item.latitude),
        focusLng: String(item.longitude),
        focusKey: String(Date.now()),
      },
    });
  };

  const openNearbyOnMap = () => {
    router.push({
      pathname: "/",
      params: { nearby: "1" },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#083344", "#155e75", "#1f6f82"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.eyebrow}>ISTANBUL SMART TOURISM GUIDE</Text>
          <Text style={styles.title}>Discover the city through stories, landmarks, and living history.</Text>
          <Text style={styles.subtitle}>
            Search places, explore by category, and jump into the map with a calm,
            sleek experience designed for easy travel.
          </Text>

          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={22} color="#8aa3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search landmarks, periods, or categories"
              placeholderTextColor="#8aa3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery("")}
              >
                <Ionicons name="close-circle" size={20} color="#8aa3af" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={openMap} activeOpacity={0.9}>
            <Text style={styles.primaryButtonText}>Open Interactive Map</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <TouchableOpacity onPress={openMap}>
            <Text style={styles.sectionLink}>See map</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryChip}
              onPress={() => openCategoryOnMap(category)}
              activeOpacity={0.85}
            >
              <Text style={styles.categoryChipText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard} onPress={openMap} activeOpacity={0.9}>
            <View style={styles.quickActionIconWrap}>
              <Ionicons name="map-outline" size={24} color="#17414d" />
            </View>
            <Text style={styles.quickActionTitle}>Map</Text>
            <Text style={styles.quickActionText}>
              Open the full interactive map of historical places.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard} onPress={openNearbyOnMap} activeOpacity={0.9}>
            <View style={styles.quickActionIconWrap}>
              <Ionicons name="navigate-outline" size={24} color="#17414d" />
            </View>
            <Text style={styles.quickActionTitle}>Nearby</Text>
            <Text style={styles.quickActionText}>
              Jump to places close to your current location.
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery.trim() ? "Search Results" : "Featured Places"}
          </Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Saved</Text>
          </TouchableOpacity>
        </View>

        {filteredPlaces.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No places matched your search.</Text>
          </View>
        ) : (
          filteredPlaces.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.placeCard}
              onPress={() =>
                openPlaceOnMap({
                  title: item.title,
                  latitude: item.latitude,
                  longitude: item.longitude,
                })
              }
              activeOpacity={0.92}
            >
              <View style={styles.placeMetaRow}>
                <Text style={styles.placeCategoryPill}>{item.category}</Text>
                {!!item.period && <Text style={styles.placePeriod}>{item.period}</Text>}
              </View>
              <Text style={styles.placeTitle}>{item.title}</Text>
              <Text style={styles.placeDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    borderRadius: 30,
    padding: 18,
    paddingTop: 22,
    marginBottom: 22,
  },
  eyebrow: {
    color: "#f6e7cf",
    fontSize: 12,
    letterSpacing: 2.6,
    fontWeight: "800",
    marginBottom: 12,
  },
  title: {
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: "#d9e7ea",
    marginBottom: 18,
  },
  searchContainer: {
    position: "relative",
    marginBottom: 14,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "rgba(115, 158, 173, 0.35)",
    borderRadius: 20,
    paddingLeft: 48,
    paddingRight: 46,
    paddingVertical: 15,
    fontSize: 16,
    color: "#ffffff",
  },
  clearButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  primaryButton: {
    backgroundColor: "#d8b15e",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#0f3340",
    fontWeight: "800",
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#102733",
  },
  sectionLink: {
    fontSize: 15,
    fontWeight: "700",
    color: "#123c4a",
  },
  categoriesRow: {
    paddingBottom: 12,
    paddingRight: 8,
  },
  categoryChip: {
    backgroundColor: "#eceff1",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  categoryChipText: {
    color: "#163b48",
    fontSize: 14,
    fontWeight: "700",
  },
  quickActionsGrid: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  quickActionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4f5",
    marginBottom: 18,
  },
  quickActionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#102733",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: "#66757d",
    lineHeight: 22,
  },
  placeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  placeMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  placeCategoryPill: {
    backgroundColor: "#edf4f6",
    color: "#1a4a58",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  placePeriod: {
    color: "#6f7f86",
    fontSize: 13,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "right",
  },
  placeTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#102733",
    marginBottom: 10,
  },
  placeDescription: {
    fontSize: 15,
    lineHeight: 24,
    color: "#66757d",
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
  },
  emptyText: {
    fontSize: 15,
    color: "#6b7280",
  },
});
