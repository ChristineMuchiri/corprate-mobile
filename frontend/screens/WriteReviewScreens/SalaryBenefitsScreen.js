import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { reviewThemes } from '../../utilities/theme';
import { API_BASE_URL } from '@env';

const SalaryBenefitsScreen = () => {
  const theme = reviewThemes.salaryBenefits; // Green theme
  const baseTheme = reviewThemes.base;
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [monthlyPay, setMonthlyPay] = useState('');
  const [comments, setComments] = useState('');
  const [benefits, setBenefits] = useState({
    healthInsurance: false,
    remoteWork: false,
    paidLeave: false,
    learningStipend: false,
    parentalLeave: false,
    flexibleHours: false,
    gymMembership: false
  });

  
  const handleSubmit = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/write-reviews/salarybenefits`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              companyName,
              jobTitle,
              yearsExperience,
              monthlyPay,
              comments,
              benefits,
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

  const toggleBenefit = (benefit) => {
    setBenefits({...benefits, [benefit]: !benefits[benefit]});
  };

  return (
    <View style={[styles.container, {backgroundColor: baseTheme.background}]}>
      {/* Header */}
      <View style={[styles.header, {borderBottomColor: baseTheme.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: baseTheme.text}]}>Salary & Benefits</Text>
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
            placeholder="Company name"
            placeholderTextColor={baseTheme.muted}
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Job Title */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Your Role/Title *</Text>
          <TextInput
            style={[styles.input, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="e.g. Software Engineer"
            placeholderTextColor={baseTheme.muted}
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        </View>

        {/* Experience & Salary */}
        <View style={styles.row}>
          <View style={[styles.section, {flex: 1, marginRight: 8}]}>
            <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Years Experience *</Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: baseTheme.card,
                color: baseTheme.text,
                borderColor: baseTheme.border
              }]}
              placeholder="0"
              placeholderTextColor={baseTheme.muted}
              keyboardType="numeric"
              value={yearsExperience}
              onChangeText={setYearsExperience}
            />
          </View>
          <View style={[styles.section, {flex: 1}]}>
            <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Monthly Pay (KSh) *</Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: baseTheme.card,
                color: baseTheme.text,
                borderColor: baseTheme.border
              }]}
              placeholder="Amount"
              placeholderTextColor={baseTheme.muted}
              keyboardType="numeric"
              value={monthlyPay}
              onChangeText={setMonthlyPay}
            />
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Benefits Provided</Text>
          
          {Object.entries({
            healthInsurance: 'Health Insurance',
            remoteWork: 'Remote Work',
            paidLeave: 'Paid Leave',
            learningStipend: 'Learning Stipend',
            parentalLeave: 'Parental Leave',
            flexibleHours: 'Flexible Hours',
            gymMembership: 'Gym Membership'
          }).map(([key, label]) => (
            <View key={key} style={styles.benefitItem}>
              <Switch
                value={benefits[key]}
                onValueChange={() => toggleBenefit(key)}
                trackColor={{ false: "#767577", true: theme.primary }}
                thumbColor="#f4f3f4"
              />
              <Text style={[styles.benefitLabel, {color: baseTheme.text}]}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Additional Comments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: baseTheme.text}]}>Additional Comments</Text>
          <TextInput
            style={[styles.input, styles.multilineInput, {
              backgroundColor: baseTheme.card,
              color: baseTheme.text,
              borderColor: baseTheme.border
            }]}
            placeholder="Any other details about compensation..."
            placeholderTextColor={baseTheme.muted}
            multiline
            numberOfLines={4}
            value={comments}
            onChangeText={setComments}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[
            styles.submitButton,
            {backgroundColor: theme.secondary},
            (!companyName || !jobTitle || !yearsExperience || !monthlyPay) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!companyName || !jobTitle || !yearsExperience || !monthlyPay}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
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
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitLabel: {
    marginLeft: 12,
    fontSize: 14,
  },
  submitButton: {
    borderRadius: 8,
    padding: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width: 150,
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SalaryBenefitsScreen;