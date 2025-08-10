import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InterviewExperienceScreen = ({ navigation, route }) => {
  const [companyName, setCompanyName] = useState(route.params?.company || '');
  const [jobTitle, setJobTitle] = useState('');
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

  const handleSubmit = () => {
    if (!companyName || !jobTitle || difficulty === 0) {
      Alert.alert('Required Fields', 'Please fill company, role, and difficulty');
      return;
    }
    Alert.alert('Thank You!', 'Your experience will help other candidates');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1e88e5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Interview Experience</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Details *</Text>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            placeholderTextColor="#666"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={[styles.input, { marginTop: 12 }]}
            placeholder="Role (e.g. Frontend Engineer)"
            placeholderTextColor="#666"
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        </View>

        {/* Interview Process */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Process Overview</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Total rounds"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={processRounds}
              onChangeText={setProcessRounds}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Duration (e.g. 3 weeks)"
              placeholderTextColor="#666"
              value={processDuration}
              onChangeText={setProcessDuration}
            />
          </View>
          
          <Text style={styles.subtitle}>Interview Formats:</Text>
          <View style={styles.typeGrid}>
            {interviewTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typePill,
                  selectedTypes.includes(type) && styles.selectedPill
                ]}
                onPress={() => toggleInterviewType(type)}
              >
                <Text style={styles.typeText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Difficulty */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty Rating *</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setDifficulty(star)}>
                <Icon 
                  name={star <= difficulty ? 'star' : 'star-outline'} 
                  size={32} 
                  color={star <= difficulty ? '#FFD700' : '#666'} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question Bank */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions Asked</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="List technical/behavioral questions..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={5}
            value={questions}
            onChangeText={setQuestions}
          />
        </View>

        {/* Preparation Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparation Advice</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="What should candidates focus on?"
            placeholderTextColor="#666"
            multiline
            numberOfLines={5}
            value={prepTips}
            onChangeText={setPrepTips}
          />
        </View>

        {/* Outcome */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result (Optional)</Text>
          <View style={styles.row}>
            {['Got Offer', 'Rejected', 'Ghosted'].map(res => (
              <TouchableOpacity
                key={res}
                style={[
                  styles.outcomePill,
                  outcome === res && styles.selectedOutcome
                ]}
                onPress={() => setOutcome(res)}
              >
                <Text style={styles.outcomeText}>{res}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!companyName || !jobTitle || difficulty === 0) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!companyName || !jobTitle || difficulty === 0}
        >
          <Text style={styles.submitText}>Share Experience</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1c2a',
    color: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#252838',
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
    borderColor: '#252838',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#1a1c2a',
  },
  selectedPill: {
    backgroundColor: '#252838',
    borderColor: '#1e88e5',
  },
  typeText: {
    color: '#fff',
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
    borderColor: '#252838',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#1a1c2a',
  },
  selectedOutcome: {
    backgroundColor: '#252838',
    borderColor: '#1e88e5',
  },
  outcomeText: {
    color: '#fff',
    fontSize: 14,
  },
  submitContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: '#0b0d16',
    borderTopWidth: 1,
    borderTopColor: '#252838',
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    width: 150,
  },
  disabledButton: {
    backgroundColor: '#252838',
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InterviewExperienceScreen;