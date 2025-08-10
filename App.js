import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./screens/LandingScreen";
import MainTabs from "./navigation/MainTabs";
import CompanyRatingScreen from "./screens/CompanyRatingScreen";
import GeneralReviewScreen from "./screens/GeneralReviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        {/* Tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        {/* Additional screens */}
        <Stack.Screen name="CompanyRatingScreen" component={CompanyRatingScreen} />
        <Stack.Screen name="GeneralReviewScreen" component={GeneralReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
