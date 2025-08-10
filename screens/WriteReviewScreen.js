import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from "react-native";

export default function WriteReviewScreen() {
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  const sections = [
    { title: "Company Rating", desc: "How satisfied are you overall?", emoji: "⭐", screen: "CompanyRatingScreen" },
    { title: "General Review", desc: "Share your thoughts about working here.", emoji: "💬" , screen: "GeneralReviewScreen"},
    { title: "Salary & Benefits", desc: "Rate pay, perks, and allowances.", emoji: "💰" , screen: "SalaryBenefitsScreen"},
  ];

  const moreSections = [
    { title: "Workplace Vibes", desc: "What's the office culture like?", emoji: "🎉", screen: "WorkplaceVibesScreen" },
    { title: "Interview Experience", desc: "Was the process fair and smooth?", emoji: "📝", screen: "InterviewExperienceScreen" },
  ];

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderSection = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => handleNavigation(item.screen)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Write a Review</Text>

      {sections.map(renderSection)}

      {showMore && moreSections.map(renderSection)}
      


      <TouchableOpacity
        style={styles.moreBtn}
        onPress={() => setShowMore(!showMore)}
      >
        <Text style={styles.moreBtnText}>
          {showMore ? "Show Less" : "More..."}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0d16",
    padding: 16,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1a1c2b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDesc: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
  moreBtn: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
  },
  moreBtnText: {
    color: "#4da6ff",
    fontSize: 14,
  },
});
