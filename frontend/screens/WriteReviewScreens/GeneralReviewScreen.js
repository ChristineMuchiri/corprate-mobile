import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { reviewThemes } from '../../utilities/theme'; // Import the theme file

const GeneralReviewPage = ({ route }) => {
  const theme = reviewThemes.generalReview; // Blue theme
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState(route.params?.company || '');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [advice, setAdvice] = useState('');

  const handleSubmit = () => {
    if (!companyName || !pros || !cons) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Review Submitted', 'Thank you for your feedback!');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: reviewThemes.base.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: reviewThemes.base.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Review</Text>
        <Icon name={theme.icon} size={24} color={theme.primary} style={styles.themeIcon} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Company Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Name *</Text>
          <TextInput
            style={[styles.input, { borderColor: reviewThemes.base.border }]}
            placeholder="Where did you work?"
            placeholderTextColor={reviewThemes.base.muted}
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Pros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pros *</Text>
          <Text style={[styles.subtitle, { color: theme.primary }]}>
            What did you like about working here?
          </Text>
          <TextInput
            style={[styles.input, styles.multilineInput, { borderColor: reviewThemes.base.border }]}
            placeholder="Positive aspects, benefits, culture..."
            placeholderTextColor={reviewThemes.base.muted}
            multiline
            numberOfLines={4}
            value={pros}
            onChangeText={setPros}
          />
        </View>

        {/* Cons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cons *</Text>
          <Text style={[styles.subtitle, { color: theme.primary }]}>
            What could be improved?
          </Text>
          <TextInput
            style={[styles.input, styles.multilineInput, { borderColor: reviewThemes.base.border }]}
            placeholder="Challenges, drawbacks, issues..."
            placeholderTextColor={reviewThemes.base.muted}
            multiline
            numberOfLines={4}
            value={cons}
            onChangeText={setCons}
          />
        </View>

        {/* Advice to Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advice to Management</Text>
          <Text style={[styles.subtitle, { color: theme.primary }]}>
            What suggestions would you give to leadership?
          </Text>
          <TextInput
            style={[styles.input, styles.multilineInput, { borderColor: reviewThemes.base.border }]}
            placeholder="Recommendations for improvement..."
            placeholderTextColor={reviewThemes.base.muted}
            multiline
            numberOfLines={4}
            value={advice}
            onChangeText={setAdvice}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity 
            style={[
              styles.submitButton,
              { backgroundColor: theme.primary },
              (!companyName || !pros || !cons) && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!companyName || !pros || !cons}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Base styles (theme colors are applied dynamically)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  themeIcon: {
    marginLeft: 16,
    opacity: 0.8,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1c2a',
    color: '#ffffff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButtonContainer: {
    marginTop: 16,
  },
  submitButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    width: '100%',
    width: 150, // Fixed width
    alignSelf: 'center', // Center horizontally
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: '#252838',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GeneralReviewPage;