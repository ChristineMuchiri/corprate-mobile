import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function WriteReviewScreen({ navigation }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (!company || !position || !review) {
      Alert.alert('Incomplete', 'Please fill in all fields before submitting.');
      return;
    }

    // Handle sending/storing the review here (e.g., backend, Firestore, etc.)
    Alert.alert('Success', 'Your anonymous review has been submitted.');

    // Clear the form
    setCompany('');
    setPosition('');
    setReview('');

    // Navigate back to Home
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.heading}>Write a Review</Text>

        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={company}
          onChangeText={setCompany}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Position"
          value={position}
          onChangeText={setPosition}
        />

        <TextInput
          style={[styles.input, { height: 150 }]}
          placeholder="Write your honest experience..."
          value={review}
          onChangeText={setReview}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d16',
  },
  inner: {
    padding: 24,
  },
  heading: {
    fontSize: 24,
    color: '#fceabb',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1c1f2b',
    color: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f1ba2e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0b0d16',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
