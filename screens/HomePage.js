import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import HeaderBar from '../utilities/HeaderBar'; 
import { Ionicons } from '@expo/vector-icons'; // Or react-native-vector-icons

const dummyReviews = [
  {
    id: '1',
    company: 'Acme Inc.',
    review: 'Toxic management, unrealistic deadlines, but great coffee.',
    date: '2 days ago',
  },
  {
    id: '2',
    company: 'DevHaus',
    review: 'Supportive team, fair pay, work-life balance could be better.',
    date: '5 days ago',
  },
  // Add more as needed
];

export default function HomePage({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.companyName}>{item.company}</Text>
      <Text style={styles.reviewText}>{item.review}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <HeaderBar />
      

      <FlatList
        data={dummyReviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('WriteReview')}
      >
        <Ionicons name="create-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d16',
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fceabb',
    marginVertical: 16,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#1a1d29',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#f1ba2e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  companyName: {
    color: '#f1ba2e',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  dateText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#f1ba2e',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fceabb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 10,
  },
});
