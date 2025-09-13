import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BottomTabNavigator from './components/BottomTabNavigator';
import SignOutScreen from './screens/SignOutScreen';
import MarketPricesScreen from './screens/MarketPricesScreen';
import KnowledgeScreen from './screens/KnowledgeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="SignOut" component={SignOutScreen} />
        <Stack.Screen name="MarketPrices" component={MarketPricesScreen} />
        <Stack.Screen name="Knowledge" component={KnowledgeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
