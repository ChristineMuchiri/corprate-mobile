import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Homepage from '../screens/HomePage';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import CompaniesScreen from '../screens/CompaniesScreen.js';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0b0d16' },
        tabBarActiveTintColor: '#f1ba2e',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Write':
              iconName = 'pencil-outline';
              break;
            case 'Companies':
              iconName = 'business-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen
          name="Write"
          component={WriteReviewScreen}
          options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="create" size={24} color={color} />
    ),
  }}
/>
      <Tab.Screen name="Companies" component={CompaniesScreen}/>
    </Tab.Navigator>
  );
}
