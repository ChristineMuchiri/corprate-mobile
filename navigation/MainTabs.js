import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Animated, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Homepage from '../screens/HomePage';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import CompaniesScreen from '../screens/CompaniesScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#0b0d16',
          borderTopColor: '#252838',
          height: 70,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#f1ba2e',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Homepage}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon 
              focused={focused}
              activeIcon="home"
              inactiveIcon="home-outline"
              color={color}
              badgeCount={3} // Example badge
            />
          ),
        }}
      />
      <Tab.Screen
        name="Write"
        component={WriteReviewScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon 
              focused={focused}
              activeIcon="create"
              inactiveIcon="create-outline"
              color={color}
              withPulse={true}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Companies" 
        component={CompaniesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon 
              focused={focused}
              activeIcon="business"
              inactiveIcon="business-outline"
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabBarIcon = ({ focused, activeIcon, inactiveIcon, color, badgeCount, withPulse }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.spring(scaleValue, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View style={[styles.tabItem, { transform: [{ scale: scaleValue }] }]}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={focused ? activeIcon : inactiveIcon} 
          size={28} 
          color={color}
        />
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
        {withPulse && focused && (
          <Animated.View 
            style={[
              styles.pulseRing,
              { borderColor: color }
            ]}
          />
        )}
      </View>
      {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    position: 'relative',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pulseRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 24,
    borderWidth: 2,
    opacity: 0.5,
  },
});