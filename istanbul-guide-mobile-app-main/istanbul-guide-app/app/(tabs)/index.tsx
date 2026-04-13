import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { getDistance } from "geolib";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LandmarkDetailCard from "../../components/LandmarkDetailCard";
import MyLocationButton from "../../components/MyLocationButton";
import { useHistoricalPlaces } from "../../hooks/useHistoricalPlaces";
import { MapCategory, MapItem } from "../../types/map";

const ISTANBUL_REGION: Region = {
  latitude: 41.0082,
  longitude: 28.9784,
  latitudeDelta: 0.22,
  longitudeDelta: 0.22,
};

const ALL_CATEGORIES: Array<MapCategory | "All"> = [
  "All",
  "Mosque",
  "Palace",
  "Museum",
  "Historical Event",
  "Monument",
];

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const [region, setRegion] = useState<Region>(ISTANBUL_REGION);
  const [selectedCategory, setSelectedCategory] = useState<MapCategory | "All">("All");
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
  const [locationStatus, setLocationStatus] = useState("Getting location...");
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);

  const params = useLocalSearchParams<{
    category?: string;
    focusTitle?: string;
    focusLat?: string;
    focusLng?: string;
    focusKey?: string;
    nearby?: string;
  }>();

  const { places, loading, error } = useHistoricalPlaces();

  const normalizeTitle = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/’/g, "'")
      .trim();

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationStatus("Location permission denied. Showing Istanbul by default.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(coords);

      const newRegion: Region = {
        ...coords,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);

      setLocationStatus("");
    } catch {
      setLocationStatus("Could not fetch location. Showing Istanbul by default.");
    }
  };

  const getCategoryColor = (category: MapCategory) => {
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
        return "#6b7280";
    }
  };

  const findPlaceByFocusParams = () => {
    if (places.length === 0) return null;

    const focusTitle = params.focusTitle
      ? normalizeTitle(String(params.focusTitle))
      : null;

    const focusLat = params.focusLat ? Number(params.focusLat) : null;
    const focusLng = params.focusLng ? Number(params.focusLng) : null;

    if (focusTitle) {
      const titleMatch = places.find(
        (item) => normalizeTitle(item.title) === focusTitle
      );
      if (titleMatch) return titleMatch;
    }

    if (
      focusLat !== null &&
      !Number.isNaN(focusLat) &&
      focusLng !== null &&
      !Number.isNaN(focusLng)
    ) {
      let closestPlace: MapItem | null = null;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const place of places) {
        const distance = getDistance(
          { latitude: focusLat, longitude: focusLng },
          { latitude: place.latitude, longitude: place.longitude }
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestPlace = place;
        }
      }

      if (closestPlace && smallestDistance < 800) {
        return closestPlace;
      }
    }

    return null;
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setShowNearbyPlaces(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!params.category) return;

    const incomingCategory = String(params.category) as MapCategory | "All";
    setSelectedCategory(incomingCategory);
    setSelectedItem(null);
    setShowNearbyPlaces(false);
  }, [params.category]);

  useEffect(() => {
    if (params.nearby === "1") {
      setShowNearbyPlaces(true);
      setSelectedItem(null);
    }
  }, [params.nearby]);

  useEffect(() => {
    if (!params.focusTitle && !params.focusLat && !params.focusLng) return;
    if (places.length === 0) return;

    const place = findPlaceByFocusParams();
    if (!place) return;

    if (selectedCategory !== "All" && place.category !== selectedCategory) {
      setSelectedCategory("All");
    }

    setSelectedItem(place);
    setShowNearbyPlaces(false);

    const newRegion: Region = {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
  }, [
    params.focusKey,
    params.focusTitle,
    params.focusLat,
    params.focusLng,
    places,
  ]);

  const filteredPlaces = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return places.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.period ?? "").toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [places, selectedCategory, searchQuery]);

  useEffect(() => {
    if (
      selectedItem &&
      !filteredPlaces.some((place) => place.id === selectedItem.id)
    ) {
      setSelectedItem(null);
    }
  }, [filteredPlaces, selectedItem]);

  const selectedItemDistanceKm =
    selectedItem && userLocation
      ? (
        getDistance(userLocation, {
          latitude: selectedItem.latitude,
          longitude: selectedItem.longitude,
        }) / 1000
      ).toFixed(1)
      : null;

  const nearbyPlaces = useMemo(() => {
    if (!userLocation) return [];

    return filteredPlaces
      .map((place) => ({
        ...place,
        distance:
          getDistance(userLocation, {
            latitude: place.latitude,
            longitude: place.longitude,
          }) / 1000,
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [userLocation, filteredPlaces]);

  const bottomOffset = tabBarHeight + insets.bottom + 18;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onPress={() => {
          setSelectedItem(null);
          setShowNearbyPlaces(false);
        }}
      >
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress={() => {
              setSelectedItem(place);
              setShowNearbyPlaces(false);

              const newRegion: Region = {
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025,
              };

              setRegion(newRegion);
              mapRef.current?.animateToRegion(newRegion, 700);
            }}
            pinColor={getCategoryColor(place.category)}
          />
        ))}
      </MapView>

      {userLocation && (
        <View
          style={[
            styles.locationButtonWrapper,
            { bottom: bottomOffset + 78 },
          ]}
        >
          <MyLocationButton
            onPress={() => {
              const newRegion: Region = {
                ...userLocation,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              };

              setRegion(newRegion);
              mapRef.current?.animateToRegion(newRegion, 1000);
            }}
          />
        </View>
      )}

      <View
        style={[
          styles.topOverlay,
          { top: insets.top + 18 },
        ]}
      >
        <View style={styles.headerRow}>
          <Text style={styles.panelTitle}>Discover Istanbul</Text>
          <Text style={styles.panelCount}>{filteredPlaces.length} places</Text>
        </View>

        {!!locationStatus && <Text style={styles.statusText}>{locationStatus}</Text>}
        {!!loading && <Text style={styles.statusText}>Loading places...</Text>}
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.searchShell}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search landmarks or events"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {ALL_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isActive && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.legendRow}
        >
          {(["Mosque", "Palace", "Museum", "Historical Event", "Monument"] as MapCategory[]).map(
            (item) => (
              <View key={item} style={styles.legendChip}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: getCategoryColor(item) },
                  ]}
                />
                <Text style={styles.legendText}>
                  {item === "Historical Event" ? "Event" : item}
                </Text>
              </View>
            )
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.nearbyButton}
          onPress={() => {
            setShowNearbyPlaces((prev) => !prev);
            setSelectedItem(null);
          }}
        >
          <Text style={styles.nearbyButtonText}>
            {showNearbyPlaces ? "Hide Nearby Places" : "Show Nearby Places"}
          </Text>
        </TouchableOpacity>

        {showNearbyPlaces && searchQuery.trim().length === 0 && (
          <View style={styles.nearbyCard}>
            <Text style={styles.nearbyTitle}>Nearby Places</Text>

            {nearbyPlaces.length === 0 ? (
              <Text style={styles.nearbyEmpty}>No nearby places found.</Text>
            ) : (
              nearbyPlaces.map((place, index) => (
                <TouchableOpacity
                  key={place.id}
                  style={[
                    styles.nearbyItem,
                    index === nearbyPlaces.length - 1 && styles.nearbyItemLast,
                  ]}
                  onPress={() => {
                    setSelectedItem(place);
                    setShowNearbyPlaces(false);

                    const newRegion: Region = {
                      latitude: place.latitude,
                      longitude: place.longitude,
                      latitudeDelta: 0.025,
                      longitudeDelta: 0.025,
                    };

                    setRegion(newRegion);
                    mapRef.current?.animateToRegion(newRegion, 1000);
                  }}
                >
                  <View style={styles.nearbyItemLeft}>
                    <View
                      style={[
                        styles.nearbyItemDot,
                        { backgroundColor: getCategoryColor(place.category) },
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={1} style={styles.nearbyItemTitle}>
                        {place.title}
                      </Text>
                      <Text style={styles.nearbyItemMeta}>
                        {place.category}
                        {place.period ? ` • ${place.period}` : ""}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.nearbyDistance}>
                    {place.distance.toFixed(1)} km
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>

      {selectedItem && (
        <View
          style={[
            styles.detailCardWrapper,
            { bottom: bottomOffset },
          ]}
        >
          <LandmarkDetailCard
            item={selectedItem}
            distanceKm={selectedItemDistanceKm}
            onClose={() => setSelectedItem(null)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e7eb",
  },

  map: {
    flex: 1,
  },

  topOverlay: {
    position: "absolute",
    left: 14,
    right: 14,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  panelTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },

  panelCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#164e63",
  },

  statusText: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 6,
  },

  errorText: {
    fontSize: 12,
    color: "#dc2626",
    marginBottom: 6,
  },

  searchShell: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2f7",
    borderRadius: 18,
    minHeight: 56,
    paddingLeft: 14,
    paddingRight: 44,
    marginBottom: 14,
  },

  searchIcon: {
    fontSize: 24,
    color: "#94a3b8",
    marginRight: 8,
    marginTop: -2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },

  clearButton: {
    position: "absolute",
    right: 14,
    top: 16,
  },

  clearButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748b",
  },

  categoryRow: {
    paddingBottom: 6,
  },

  categoryChip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    marginRight: 10,
  },

  categoryChipActive: {
    backgroundColor: "#0b132b",
  },

  categoryChipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },

  categoryChipTextActive: {
    color: "#ffffff",
  },

  legendRow: {
    paddingTop: 2,
    paddingBottom: 12,
  },

  legendChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },

  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },

  legendText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748b",
  },

  nearbyButton: {
    backgroundColor: "#0b132b",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },

  nearbyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  nearbyCard: {
    marginTop: 14,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  nearbyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },

  nearbyEmpty: {
    fontSize: 14,
    color: "#64748b",
  },

  nearbyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  nearbyItemLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },

  nearbyItemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },

  nearbyItemDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  nearbyItemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },

  nearbyItemMeta: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748b",
  },

  nearbyDistance: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f766e",
  },

  locationButtonWrapper: {
    position: "absolute",
    right: 16,
  },

  detailCardWrapper: {
    position: "absolute",
    left: 12,
    right: 12,
  },
});