import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from "react-native";

export default function WriteReviewScreen() {
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  const sections = [
    {
    title: "Company Rating",
    desc: "How satisfied are you overall?",
    icon: "star",
    color: "#FFD700", // Gold for ratings
    screen: "CompanyRatingScreen"
  },
    {
    title: "General Review",
    desc: "Share your thoughts about working here.",
    icon: "edit",
    color: "#1e88e5", // Blue for text-based
    screen: "GeneralReviewScreen"
  },
    { title: "Salary & Benefits", 
      desc: "Rate pay, perks, and allowances.",
      icon: "attach-money", // MaterialIcons name
      color: "#4CAF50", // Green for money-related 
      screen: "SalaryBenefitsScreen"},
  ];

  const moreSections = [
    { 
      title: "Workplace Vibes", 
      desc: "What's the office culture like?",
      icon: "mood", // MaterialIcons name
      color: "#FF9800", // Orange for mood-related
      screen: "WorkplaceVibesScreen" 
    },
    { 
      title: "Interview Experience", 
      desc: "Was the process fair and smooth?",
      icon: "question-answer", // MaterialIcons name
      color: "#9C27B0", // Purple for Q&A  
      screen: "InterviewExperienceScreen" 
    },
  ];

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderSection = (item, index) => (
    <TouchableOpacity 
      key={index}
      style={[styles.card, { borderLeftWidth: 4, borderLeftColor: item.color }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate(item.screen)}
  >
      <Icon 
        name={item.icon} 
        size={24} 
        color={item.color} 
        style={styles.icon}
    />
    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#666" />
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
    justifyContent: 'space-between',
  },
   cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Takes all available space except chevron
  },
  icon: {
    marginRight: 16, // Increased from 12 for more space
    width: 24,
  },
  cardText: {
    flex: 1, // Allows text to take remaining space
    marginRight: 8, // Space before chevron
  },
  chevron: {
    marginLeft: 'auto', // Pushes to far right
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
