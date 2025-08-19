import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { reviewThemes } from '../../utilities/theme';
import { API_BASE_URL } from '@env';

const InterviewExperienceScreen = ({ navigation, route }) => {
  const theme = reviewThemes.interviewExperience; // Purple theme
  const baseTheme = reviewThemes.base;
  const [companyName, setCompanyName] = useState(route.params?.company || '');
  const [role, setRole] = useState('');
  const [processRounds, setProcessRounds] = useState('');
  const [processDuration, setProcessDuration] = useState('');
  const [questions, setQuestions] = useState('');
  const [prepTips, setPrepTips] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [outcome, setOutcome] = useState('');
  
  const interviewTypes = [
    'Technical Test', 'Case Study', 'Whiteboard', 
    'Take-home', 'Behavioral', 'Panel'
  ];
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleInterviewType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleSubmit = async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/write-reviews/interviewexperience`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  companyName,
                  role,
                  processRounds,
                  processDuration,
                  questions,
                  prepTips,
                  difficulty,
                  selectedTypes,
                  outcome,
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
    <View style={[styles.container, {backgroundColor: baseTheme.background}]}>
      {/* Header */}
      <View style={[styles.header, {borderBottomColor: baseTheme.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: baseTheme.text}]}>Interview Experience</Text>
        <Icon name={theme.icon} size={24} color={theme.primary} style={styles.themeIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Job Details *</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="Company Name"
            placeholderTextColor={baseTheme.muted}
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={[styles.input, { 
              marginTop: 12,
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="Role (e.g. Frontend Engineer)"
            placeholderTextColor={baseTheme.muted}
            value={role}
            onChangeText={setRole}
          />
        </View>

        {/* Interview Process */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Process Overview</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { 
                marginBottom: 12,
                backgroundColor: baseTheme.card,
                color: baseTheme.text,
                borderColor: baseTheme.border
              }]}
              placeholder="Total rounds"
              placeholderTextColor={baseTheme.muted}
              keyboardType="numeric"
              value={processRounds}
              onChangeText={setProcessRounds}
            />
            <TextInput
              style={[styles.input, {
                backgroundColor: baseTheme.card,
                color: baseTheme.text,
                borderColor: baseTheme.border
              }]}
              placeholder="Duration (e.g. 3 weeks)"
              placeholderTextColor={baseTheme.muted}
              value={processDuration}
              onChangeText={setProcessDuration}
            />
          </View>
          
          <Text style={[styles.subtitle, {color: baseTheme.muted}]}>Interview Formats:</Text>
          <View style={styles.typeGrid}>
            {interviewTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typePill,
                  {borderColor: baseTheme.border},
                  selectedTypes.includes(type) && {
                    backgroundColor: baseTheme.card,
                    borderColor: theme.primary
                  }
                ]}
                onPress={() => toggleInterviewType(type)}
              >
                <Text style={[styles.typeText, {color: baseTheme.text}]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Difficulty */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Difficulty Rating *</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setDifficulty(star)}>
                <Icon 
                  name={star <= difficulty ? 'star' : 'star-outline'} 
                  size={32} 
                  color={star <= difficulty ? '#FFD700' : baseTheme.muted} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question Bank */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Questions Asked</Text>
          <TextInput
            style={[styles.input, styles.multilineInput, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="List technical/behavioral questions..."
            placeholderTextColor={baseTheme.muted}
            multiline
            numberOfLines={5}
            value={questions}
            onChangeText={setQuestions}
          />
        </View>

        {/* Preparation Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Preparation Advice</Text>
          <TextInput
            style={[styles.input, styles.multilineInput, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="What should candidates focus on?"
            placeholderTextColor={baseTheme.muted}
            multiline
            numberOfLines={5}
            value={prepTips}
            onChangeText={setPrepTips}
          />
        </View>

        {/* Outcome */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Result (Optional)</Text>
          <View style={styles.row}>
            {['Got Offer', 'Rejected', 'Ghosted'].map(res => (
              <TouchableOpacity
                key={res}
                style={[
                  styles.outcomePill,
                  {borderColor: baseTheme.border},
                  outcome === res && {
                    backgroundColor: baseTheme.card,
                    borderColor: theme.primary
                  }
                ]}
                onPress={() => setOutcome(res)}
              >
                <Text style={[styles.outcomeText, {color: baseTheme.text}]}>{res}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      
        {/* Submit Button */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity 
            style={[
              styles.submitButton,
              {backgroundColor: theme.secondary},
              (!companyName || !role || difficulty === 0) && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!companyName || !role || difficulty === 0}
          >
            <Text style={styles.submitText}>Share Experience</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
    flex: 1, // Takes available space
    textAlign: 'center',
  },
  themeIcon: {
    marginLeft: 16,
    opacity: 0.8, // Subtle appearance
},
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  typePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  typeText: {
    fontSize: 13,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginTop: 8,
  },
  outcomePill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  outcomeText: {
    fontSize: 14,
  },
  submitButtonContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  submitButton: {
    borderRadius: 8,
    padding: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginVertical: 16,
    width: 150,
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InterviewExperienceScreen;