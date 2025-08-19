import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { reviewThemes } from '../../utilities/theme';
import { API_BASE_URL } from '@env';

const WorkplaceVibesScreen = ({ navigation }) => {
  const theme = reviewThemes.workplaceVibes; // Orange theme
  const baseTheme = reviewThemes.base;
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

  
  const handleSubmit = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/write-reviews/workplacevibes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                companyName,
                selectedAttributes,
                dressCode,
                freeResponse,
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
        <Text style={[styles.headerTitle, {color: baseTheme.text}]}>Workplace Vibes</Text>
        <Icon name={theme.icon} size={24} color={theme.primary} style={styles.themeIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Company Name */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Company Name *</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="Where did you experience these vibes?"
            placeholderTextColor={baseTheme.muted}
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Atmosphere Attributes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>How would you describe the work environment?</Text>
          <View style={styles.attributeGrid}>
            {attributes.map(attr => (
              <TouchableOpacity 
                key={attr} 
                style={styles.checkboxContainer}
                onPress={() => toggleAttribute(attr)}
              >
                <View style={[
                  styles.checkbox,
                  {borderColor: baseTheme.muted},
                  selectedAttributes.includes(attr) && {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary
                  }
                ]}>
                  {selectedAttributes.includes(attr) && (
                    <Icon name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={[styles.attributeText, {color: baseTheme.text}]}>{attr}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dress Code */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Dress Code *</Text>
          <View style={styles.optionRow}>
            {['Formal', 'Business Casual', 'Casual', 'No Dress Code'].map(code => (
              <TouchableOpacity
                key={code}
                style={[
                  styles.codeOption,
                  {borderColor: baseTheme.border},
                  dressCode === code && {
                    backgroundColor: baseTheme.card,
                    borderColor: theme.primary
                  }
                ]}
                onPress={() => setDressCode(code)}
              >
                <Text style={[styles.codeText, {color: baseTheme.text}]}>{code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Free Response */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Thoughts?</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="e.g. Friendly, Fast-paced, Innovative"
            placeholderTextColor={baseTheme.muted}
            value={freeResponse}
            onChangeText={setFreeResponse}
          />
        </View>
      
      
        {/* Submit Button */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity 
            style={[
              styles.submitButton,
              {backgroundColor: theme.secondary},
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
    paddingBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
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
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeText: {
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
    marginRight: 8,
    marginBottom: 8,
  },
  codeText: {},
  input: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
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
    fontWeight: '600',
    fontSize: 16,
  },
});

export default WorkplaceVibesScreen;