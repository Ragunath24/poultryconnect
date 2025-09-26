import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import i18n configuration
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BottomTabNavigator from './components/BottomTabNavigator';
import SignOutScreen from './screens/SignOutScreen';
import MarketPricesScreen from './screens/MarketPricesScreen';
import KnowledgeScreen from './screens/KnowledgeScreen';
// Removed LanguageProvider until a context is introduced

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerRight: () => <LanguageSwitcher showLabel={false} />,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
          <Stack.Screen name="SignOut" component={SignOutScreen} />
          <Stack.Screen name="MarketPrices" component={MarketPricesScreen} />
          <Stack.Screen name="Knowledge" component={KnowledgeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
