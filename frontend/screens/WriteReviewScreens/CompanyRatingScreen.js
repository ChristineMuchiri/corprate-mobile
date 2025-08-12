import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { reviewThemes } from '../../utilities/theme';
import { API_BASE_URL } from '@env'; // Ensure you have this set in your .env file

const CompanyRatingsPage = () => {
  const theme = reviewThemes.companyRating;
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [selectedMood, setSelectedMood] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const moods = [
    { icon: 'sentiment-very-satisfied', label: 'Excellent' },
    { icon: 'sentiment-satisfied', label: 'Good' },
    { icon: 'sentiment-neutral', label: 'Average' },
    { icon: 'sentiment-dissatisfied', label: 'Poor' },
    { icon: 'sentiment-very-dissatisfied', label: 'Terrible' },
  ];

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/write-reviews/companyrating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          overallRating,
          selectedMood: moods[selectedMood]?.label || 'No Mood Selected',
          reviewText,
        }),
      }
    );
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Review Submitted', 'Thank you for your feedback!',
          
             navigation.goBack() 
             )
  } else {
        const errorText = await response.text();
        Alert.alert('Submission Failed', 
          errorText || 'Something went wrong while submitting your review. Please try again');
  } 
    } catch (error) {
      console.error(error);
      Alert.alert('Network Error', 'We could not connect to the server. Please check your internet connection and try again.');
  };
  }
  return (
    <View style={[styles.container, { backgroundColor: reviewThemes.base.background }]}>
      {/* Header with theme color*/}
      <View style={[styles.header, { borderBottomColor: reviewThemes.base.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
          
        
        <Text style={styles.headerTitle}>Company Rating</Text>
        <Icon name={theme.icon} size={24} color={theme.primary} style={styles.themeIcon} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Company Name Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Name</Text>
          <TextInput
            style={[styles.input, { borderColor: reviewThemes.base.border }]}
            placeholder="Enter company name"
            placeholderTextColor={reviewThemes.base.muted}
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Overall Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Rating</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setOverallRating(star)}>
                <Icon
                  name={star <= overallRating ? 'star' : 'star-outline'}
                  size={32}
                  color={star <= overallRating ? theme.primary : reviewThemes.base.muted}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mood Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          <View style={styles.moodContainer}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === index && { 
                    borderColor: theme.primary,
                    backgroundColor: theme.secondary 
                  }
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Icon
                  name={mood.icon}
                  size={28}
                  color={selectedMood === index ? theme.primary : reviewThemes.base.muted}
                />
                <Text style={[
                  styles.moodLabel,
                  selectedMood === index && { color: theme.primary, fontWeight: '600' }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Review Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <TextInput
            style={[styles.reviewInput, { borderColor: reviewThemes.base.border }]}
            placeholder="Share your experience..."
            placeholderTextColor={reviewThemes.base.muted}
            multiline
            numberOfLines={5}
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        {/* Submit Button - Now inside ScrollView but sticks to bottom */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity 
            style={[
              styles.submitButton,
              { backgroundColor: theme.primary },
              (!companyName || overallRating === 0) && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!companyName || overallRating === 0}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d16',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#252838',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    flex: 1, // Takes available space
    textAlign: 'center',
  },
  themeIcon: {
    marginLeft: 16,
    opacity: 0.8, // Subtle appearance
},
  content: {
    padding: 16,
    paddingBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1a1c2a',
    color: '#ffffff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#252838',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    width: '30%',
    marginBottom: 12,
    marginRight: '3.33%',
    backgroundColor: '#1a1c2a',
    borderWidth: 1,
    borderColor: '#252838',
  },
  selectedMood: {
    borderColor: '#1e88e5',
    backgroundColor: '#252838',
  },
  moodLabel: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 12,
  },
  selectedMoodLabel: {
    color: '#1e88e5',
    fontWeight: '600',
  },
  reviewInput: {
    backgroundColor: '#1a1c2a',
    color: '#ffffff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#252838',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButtonContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    padding: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width: 150, // Fixed width
    alignSelf: 'center', // Center horizontally
  },
  disabledButton: {
    backgroundColor: '#6b6a77ff',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CompanyRatingsPage;