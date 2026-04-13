import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

import { getRecommendations, RecommendationResult } from "../../services/recommendations.services";

const commonInterests = ["History", "Architecture", "Art", "Culture", "Religion", "Nature", "Photography", "Shopping"];

export default function RecommendationsScreen() {
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests((prev) => prev.filter((i) => i !== interest));
    } else {
      setInterests((prev) => [...prev, interest]);
    }
  };

  const addCustomInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests((prev) => [...prev, trimmed]);
    }
    setInterestInput("");
  };

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setHasSearched(false);
    try {
      const results = await getRecommendations(interests);
      setRecommendations(results);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const openPlaceOnMap = (placeName: string) => {
    router.push({
      pathname: "/",
      params: {
        focusTitle: placeName,
        focusKey: String(Date.now()),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#4b2e83", "#6b42b9", "#8b5fe1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.eyebrow}>AI-POWERED INSIGHTS</Text>
          <Text style={styles.title}>Personalized Recommendations</Text>
          <Text style={styles.subtitle}>
            Tell us what you're interested in, and our AI will curate a list of places dynamically tailored for you.
          </Text>

          <View style={styles.searchContainer}>
             <TextInput
              style={styles.searchInput}
              placeholder="e.g. Byzantine artwork"
              placeholderTextColor="#d8c5ef"
              value={interestInput}
              onChangeText={setInterestInput}
              onSubmitEditing={addCustomInterest}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={addCustomInterest} style={styles.addIconBtn}>
                 <Ionicons name="add-circle" size={28} color="#d8c5ef" />
            </TouchableOpacity>
          </View>

          {interests.length > 0 && (
             <View style={styles.selectedInterestsWrap}>
                 {interests.map((item) => (
                    <TouchableOpacity key={item} style={styles.activeInterestChip} onPress={() => removeInterest(item)}>
                        <Text style={styles.activeInterestText}>{item}</Text>
                        <Ionicons name="close-circle" size={16} color="#ffffff" style={{marginLeft: 4}}/>
                    </TouchableOpacity>
                 ))}
             </View>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={fetchRecommendations} activeOpacity={0.9}>
            <Text style={styles.primaryButtonText}>
                {loading ? "Generating..." : "Get Recommendations"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Common Interests</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {commonInterests.map((interest) => {
            const isSelected = interests.includes(interest);
            return (
              <TouchableOpacity
                key={interest}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                onPress={() => toggleInterest(interest)}
                activeOpacity={0.85}
              >
                <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextSelected]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
             {hasSearched ? "Your Curated List" : "Featured Suggestions"}
          </Text>
        </View>

        {loading ? (
             <View style={styles.centerBox}>
                 <ActivityIndicator size="large" color="#6b42b9" />
                 <Text style={styles.loadingText}>Analyzing preferences...</Text>
             </View>
        ) : hasSearched && recommendations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No recommendations found for those interests.</Text>
          </View>
        ) : (
          recommendations.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.placeCard}
              onPress={() => openPlaceOnMap(item.name)}
              activeOpacity={0.92}
            >
              <View style={styles.placeMetaRow}>
                <Text style={styles.placeCategoryPill}>{item.category}</Text>
                {!!item.hybrid_score && (
                   <View style={styles.scoreWrap}>
                       <Ionicons name="star" size={14} color="#f59e0b" />
                       <Text style={styles.placeScore}>{item.hybrid_score.toFixed(1)}</Text>
                   </View>
                )}
              </View>
              <Text style={styles.placeTitle}>{item.name}</Text>
              
              <View style={styles.explanationBox}>
                  <Text style={styles.explanationTitle}>💡 Why we picked this</Text>
                  <Text style={styles.explanationText}>
                    {item.explanation}
                  </Text>
              </View>

              <Text style={styles.viewOnMapText}>View on Map</Text>
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
    paddingBottom: 110, // Avoid bottom tab overlap
  },
  heroCard: {
    borderRadius: 30,
    padding: 18,
    paddingTop: 22,
    marginBottom: 22,
  },
  eyebrow: {
    color: "#d8c5ef",
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
    color: "#e2d5f8",
    marginBottom: 18,
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "rgba(107, 66, 185, 0.4)",
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#ffffff",
  },
  addIconBtn: {
     padding: 8,
  },
  selectedInterestsWrap: {
     flexDirection: "row",
     flexWrap: "wrap",
     gap: 8,
     marginBottom: 18,
  },
  activeInterestChip: {
     flexDirection: "row",
     alignItems: "center",
     backgroundColor: "rgba(255,255,255,0.2)",
     paddingHorizontal: 12,
     paddingVertical: 6,
     borderRadius: 16,
  },
  activeInterestText: {
     color: "#ffffff",
     fontSize: 14,
     fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#4b2e83",
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
  categoriesRow: {
    paddingBottom: 12,
    paddingRight: 8,
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: "#eceff1",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryChipSelected: {
    backgroundColor: "#f4f1fa",
    borderColor: "#6b42b9",
  },
  categoryChipText: {
    color: "#163b48",
    fontSize: 14,
    fontWeight: "700",
  },
  categoryChipTextSelected: {
    color: "#6b42b9",
  },
  centerBox: {
     alignItems: "center",
     justifyContent: "center",
     paddingVertical: 40,
  },
  loadingText: {
     marginTop: 12,
     color: "#6b42b9",
     fontSize: 15,
     fontWeight: "600",
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
    backgroundColor: "#f4f1fa",
    color: "#6b42b9",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  scoreWrap: {
     flexDirection: "row",
     alignItems: "center",
     backgroundColor: "#fffdf0",
     paddingHorizontal: 10,
     paddingVertical: 6,
     borderRadius: 12,
     borderColor: "#fde68a",
     borderWidth: 1,
  },
  placeScore: {
     color: "#92400e",
     fontSize: 13,
     fontWeight: "800",
     marginLeft: 6,
  },
  placeTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#102733",
    marginBottom: 14,
  },
  explanationBox: {
     backgroundColor: "#f8fafc",
     borderRadius: 16,
     padding: 12,
     marginBottom: 14,
     borderLeftWidth: 3,
     borderLeftColor: "#6b42b9",
  },
  explanationTitle: {
     fontSize: 13,
     fontWeight: "800",
     color: "#475569",
     marginBottom: 6,
  },
  explanationText: {
     fontSize: 14,
     lineHeight: 22,
     color: "#334155",
     fontStyle: "italic",
  },
  viewOnMapText: {
     color: "#6b42b9",
     fontSize: 15,
     fontWeight: "700",
     textAlign: "right",
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 18,
  },
  emptyText: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center"
  },
});
