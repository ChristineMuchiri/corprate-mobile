import React, { useEffect, useRef } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwayingSkipText from '../utilities/slide';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';


export default function LandingPage({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Replace with your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Animated.View style={{ opacity: fadeAnim, ...styles.heroContainer }}>
        {/* <Text style={styles.title}>CorpRate</Text> */}
        <Text style={styles.subtitle}>Real workplace reviews. No filters.</Text>
        <Text style={styles.description}>
          Share honest workplace experiences anonymously. Help others make informed decisions without creating accounts.
        </Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
        <SwayingSkipText />
      </TouchableOpacity>
      {/* Feature Section */}
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <FontAwesome name="user-secret" color="#fceabb" size={24} />
          <Text style={styles.featureTitle}>100% Anonymous</Text>
          <Text style={styles.featureText}>
            No tracking. Your identity stays private.
          </Text>
        </View>
        <View style={styles.feature}>
          <FontAwesome name="commenting" color="#fceabb" size={24} />
          <Text style={styles.featureTitle}>Unfiltered Truth</Text>
          <Text style={styles.featureText}>
            Real experiences from real employees.
          </Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="people" color="#fceabb" size={24} />
          <Text style={styles.featureTitle}>Community Driven</Text>
          <Text style={styles.featureText}>
            Built by employees, for employees.
          </Text>
        </View>
        </View>
         {/* Footer */}
      <Text style={styles.footer}>Powered by CorpRate</Text>
    </View>
  );
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d16',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 240,  // adjust as needed
    height: 240, // adjust as needed
    alignSelf: 'center',
  },
  heroContainer: {
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    maxWidth: 350,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fceabb',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#ece3d0ff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#0b0d16', // soft goldish
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#e4b343',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  loginText: {
    color: '#fceabb',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingVertical: 20,
    width: '100%',
  },
  feature: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  featureText: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
  },
});


