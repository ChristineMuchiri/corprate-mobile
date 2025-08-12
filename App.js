import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./screens/LandingScreen";
import MainTabs from "./navigation/MainTabs";
import CompanyRatingScreen from "./screens/WriteReviewScreens/CompanyRatingScreen";
import GeneralReviewScreen from "./screens/WriteReviewScreens/GeneralReviewScreen";
import SalaryBenefitsScreen from "./screens/WriteReviewScreens/SalaryBenefitsScreen";
import WorkplaceVibesScreen from "./screens/WriteReviewScreens/WorkplaceVibesScreen";
import InterviewExperienceScreen from "./screens/WriteReviewScreens/InterviewExperienceScreen";

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
        <Stack.Screen name="SalaryBenefitsScreen" component={SalaryBenefitsScreen} />
        <Stack.Screen name="WorkplaceVibesScreen" component={WorkplaceVibesScreen} />
        <Stack.Screen name="InterviewExperienceScreen" component={InterviewExperienceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
