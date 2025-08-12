import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SalaryBenefitsScreen = () => {
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

  const handleSubmit = () => {
    if (!companyName || !jobTitle || !yearsExperience || !monthlyPay) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Submission Successful', 'Thank you for your salary information!');
    navigation.goBack();
  };

  const toggleBenefit = (benefit) => {
    setBenefits({...benefits, [benefit]: !benefits[benefit]});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#1e88e5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salary & Benefits</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Company Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Company name"
            placeholderTextColor="#666"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Job Title */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Role/Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Software Engineer"
            placeholderTextColor="#666"
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        </View>

        {/* Experience & Salary */}
        <View style={styles.row}>
          <View style={[styles.section, {flex: 1, marginRight: 8}]}>
            <Text style={styles.sectionTitle}>Years Experience *</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={yearsExperience}
              onChangeText={setYearsExperience}
            />
          </View>
          <View style={[styles.section, {flex: 1}]}>
            <Text style={styles.sectionTitle}>Monthly Pay (KSh) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={monthlyPay}
              onChangeText={setMonthlyPay}
            />
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits Provided</Text>
          
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
                trackColor={{ false: "#767577", true: "#1e88e5" }}
                thumbColor={benefits[key] ? "#f4f3f4" : "#f4f3f4"}
              />
              <Text style={styles.benefitLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Additional Comments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Comments</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Any other details about compensation..."
            placeholderTextColor="#666"
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitLabel: {
    color: '#ffffff',
    marginLeft: 12,
    fontSize: 14,
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

export default SalaryBenefitsScreen;