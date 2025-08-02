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
  ScrollView,
  LayoutAnimation,
  UIManager
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function WriteReviewScreen({ navigation }) {
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!company || !rating || !review || !recommendation) {
      Alert.alert('Incomplete', 'Please fill in all fields before submitting.');
      return;
    }

    LayoutAnimation.easeInEaseOut();
    setSubmitting(true);

    // Clear the form
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Success', 'Your anonymous review has been submitted.');
      setCompany('');
      setRating('');
      setReview('');
      setRecommendation(null);
      navigation.navigate('Home');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        <Text style={styles.heading}>Share Your Experience</Text>
        <Text style={styles.subtitle}>Help others by sharing your honest workplace review</Text>

        {/* Company Info Section */}
        <Text style={styles.sectionHeading}>🏢 Company Name *</Text>
        <TextInput
          style={styles.input}
          onFocus={() => setFocusedField('company')}
          onBlur={() => setFocusedField(null)} 
          placeholder={focusedField === 'company' ? '' : 'Company name'}
          value={company}
          onChangeText={setCompany}
        />
        
        <Text style={styles.label}>Overall Rating *</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={[styles.star, rating >= star && styles.starSelected]}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        {rating ? (
          <Text style={styles.ratingLabel}>
            {['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'][rating - 1]}
          </Text>
        ) : null}

        {/* Review Section */}
        <Text style={styles.sectionHeading}>📝 Your Review *</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          onFocus={() => setFocusedField('review')}
          onBlur={() => setFocusedField(null)}
          placeholder={focusedField === 'review' ? '' : "What was the culture like? How was the management?"}
          value={review}
          maxLength={500}
          onChangeText={setReview}
          multiline
        />
        <Text style={styles.charCount}>{review.length}/500</Text>

        {/* Recommendation Section */}
        <Text style={styles.sectionHeading}>🤝 Recommendation</Text>
        <Text style={styles.label}>Would you recommend this company to a friend?</Text>

        <View style={styles.recommendOptions}>
          {['Yes', 'No', 'Neutral'].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setRecommendation(option)}
              style={[
                styles.optionButton,
                recommendation === option && styles.optionSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  recommendation === option && styles.optionTextSelected,
                ]}
              >
                {option === 'Yes'
                  ? '✅ Yes, I would recommend'
                  : option === 'No'
                  ? '❌ No, I would not recommend'
                  : '🤔 Neutral / It depends'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


          {/* Submit Section */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? 'Submitting...' : 'Submit Review'}</Text>
        </TouchableOpacity>

       <Text style={styles.disclaimer}>
          Your review will be posted anonymously. We may moderate content to ensure quality.
        </Text>
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
    fontSize: 26,
    color: '#fceabb',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fceabb',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionHeading: {
    color: '#fceabb',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 10,
  },
  label: {
    color: '#fceabb',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1c1f2b',
    color: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  star: {
    fontSize: 36,
    color: '#555',
    marginHorizontal: 6,
  },
  starSelected: {
    color: '#f1ba2e',
  },
  ratingLabel: {
    textAlign: 'center',
    color: '#fceabb',
    marginBottom: 10,
  },
  recommendOptions: {
    marginBottom: 24,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#1c1f2b',
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionSelected: {
    backgroundColor: '#f1ba2e',
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
  },
  optionTextSelected: {
    color: '#0b0d16',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f1ba2e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    minWidth: 180,
  },
  buttonText: {
    color: '#0b0d16',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disclaimer: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },


});
