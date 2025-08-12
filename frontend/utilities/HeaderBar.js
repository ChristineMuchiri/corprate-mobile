import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderBar() {
  return (
    <View style={{
      backgroundColor: '#0b0d16',
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#2c2f38'
    }}>
      {/* App Name */}
      <Text style={{
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1
      }}>
        CorpRate
      </Text>

      {/* Icons */}
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <TouchableOpacity onPress={() => console.log("Search")}>
          <Ionicons name="search-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Profile")}>
          <Ionicons name="person-circle-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
