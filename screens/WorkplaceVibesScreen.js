import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkplaceVibesScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [dressCode, setDressCode] = useState('');
  const [freeResponse, setFreeResponse] = useState('');

  const attributes = [
    'Collaborative', 'Competitive', 'Quiet', 'Innovative',
    'Traditional', 'Fast-paced', 'Relaxed', 'High-pressure',
    'Social', 'Hierarchical', 'Flat structure', 'Remote-friendly'
  ];

  const toggleAttribute = (attr) => {
    setSelectedAttributes(prev => 
      prev.includes(attr) 
        ? prev.filter(a => a !== attr) 
        : [...prev, attr]
    );
  };

  const handleSubmit = () => {
    if (!companyName || !dressCode) {
      Alert.alert('Required Fields', 'Please fill in company name and dress code');
      return;
    }
    Alert.alert('Submission Successful', 'Thank you for sharing workplace vibes!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1e88e5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Workplace Vibes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Company Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Where did you experience these vibes?"
            placeholderTextColor="#666"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Atmosphere Attributes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How would you describe the work environment? </Text>
          <View style={styles.attributeGrid}>
            {attributes.map(attr => (
              <TouchableOpacity 
                key={attr} 
                style={styles.checkboxContainer}
                onPress={() => toggleAttribute(attr)}
              >
                <View style={[
                  styles.checkbox,
                  selectedAttributes.includes(attr) && styles.checkedBox
                ]}>
                  {selectedAttributes.includes(attr) && (
                    <Icon name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.attributeText}>{attr}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dress Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dress Code *</Text>
          <View style={styles.optionRow}>
            {['Formal', 'Business Casual', 'Casual', 'No Dress Code'].map(code => (
              <TouchableOpacity
                key={code}
                style={[
                  styles.codeOption,
                  dressCode === code && styles.selectedCode
                ]}
                onPress={() => setDressCode(code)}
              >
                <Text style={styles.codeText}>{code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Free Response */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thoughts?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Friendly, Fast-paced, Innovative"
            placeholderTextColor="#666"
            value={freeResponse}
            onChangeText={setFreeResponse}
          />
        </View>
      

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
      <TouchableOpacity 
        style={[
          styles.submitButton,
          (!companyName || !dressCode) && styles.disabledButton
        ]}
        onPress={handleSubmit}
        disabled={!companyName || !dressCode}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

// ... (keep all the same styles from previous implementation)
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
    paddingBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  attributeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    padding: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#1e88e5',
    borderColor: '#1e88e5',
  },
  attributeText: {
    color: '#fff',
    fontSize: 14,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  codeOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252838',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCode: {
    backgroundColor: '#252838',
    borderColor: '#1e88e5',
  },
  codeText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#1a1c2a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#252838',
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
    marginVertical: 16,
    width: 150, // Fixed width
    alignSelf: 'center', // Center horizontally
  },
  disabledButton: {
    backgroundColor: '#252838',
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default WorkplaceVibesScreen;