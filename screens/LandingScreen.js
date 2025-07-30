import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo or Icon */}
      <Image
        source={require('../assets/logo-app.png')} // Replace with your logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Headline */}
      <Text style={styles.headline}>
        A platform for structured, anonymous corporate insights
        Where professionals speak freely.
      </Text>

      {/* Subtext */}
      <Text style={styles.subtext}>
        Real stories. Anonymous and respectful.
      </Text>

      {/* Call to action button */}
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="paper-plane" size={16} color="#fff" />
        <Text style={styles.buttonText}>  Submit Your Experience</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>Powered by CorpRate</Text>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d16',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 60,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 40,
  },
  headline: {
    color: '#fceabb',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 280,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1f2233',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#fceabb',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    color: '#555',
    fontSize: 12,
    marginTop: 60,
    fontStyle: 'italic',
  },
});
