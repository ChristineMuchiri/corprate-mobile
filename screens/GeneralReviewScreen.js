import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const GeneralReviewPage = () => {
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState('');
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1e88e5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Review</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Company Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Where did you work?"
            placeholderTextColor="#666"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Pros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pros *</Text>
          <Text style={styles.subtitle}>What did you like about working here?</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Positive aspects, benefits, culture..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={pros}
            onChangeText={setPros}
          />
        </View>

        {/* Cons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cons *</Text>
          <Text style={styles.subtitle}>What could be improved?</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Challenges, drawbacks, issues..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={cons}
            onChangeText={setCons}
          />
        </View>

        {/* Advice to Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advice to Management</Text>
          <Text style={styles.subtitle}>What suggestions would you give to leadership?</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Recommendations for improvement..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={advice}
            onChangeText={setAdvice}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
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
    color: '#888',
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
    borderColor: '#252838',
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GeneralReviewPage;