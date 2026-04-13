// components/NearbyPlacesPanel.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NearbyPlace = {
  id: string;
  title: string;
  distance: number;
};

type Props = {
  showNearbyPlaces: boolean;
  searchQuery: string;
  nearbyPlaces: NearbyPlace[];
  onToggle: () => void;
  onSelectPlace: (placeId: string) => void;
};

export default function NearbyPlacesPanel({
  showNearbyPlaces,
  searchQuery,
  nearbyPlaces,
  onToggle,
  onSelectPlace,
}: Props) {
  return (
    <>
      <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
        <Text style={styles.toggleButtonText}>
          {showNearbyPlaces ? "Hide Nearby Places" : "Show Nearby Places"}
        </Text>
      </TouchableOpacity>

      {showNearbyPlaces && searchQuery.trim().length === 0 && (
        <View style={styles.container}>
          <Text style={styles.title}>Nearby Places</Text>

          {nearbyPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.placeButton}
              onPress={() => onSelectPlace(place.id)}
            >
              <Text style={styles.placeText}>
                {place.title} ({place.distance.toFixed(1)} km)
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    marginTop: 8,
    backgroundColor: "#111827",
    paddingVertical: 9,
    borderRadius: 12,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  container: {
    marginTop: 8,
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 14,
  },
  placeButton: {
    paddingVertical: 3,
  },
  placeText: {
    fontSize: 12,
    color: "#374151",
  },
});