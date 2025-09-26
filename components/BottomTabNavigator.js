import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DashboardScreen from '../screens/DashboardScreen';
import PoultryManagementScreen from '../screens/PoultryManagementScreen';
import ConnectScreen from '../screens/ConnectScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size, label }) => (
  <View style={styles.tabIconContainer}>
    <Icon name={name} size={size} color={color} />
    <Text style={[styles.tabLabel, { color }]}>{label}</Text>
  </View>
);

export default function BottomTabNavigator() {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="dashboard" color={color} size={size} label={t('nav.knowledge') ? t('nav.knowledge') && t('navigation.dashboard') : t('navigation.dashboard')} />
          ),
        }}
      />
      <Tab.Screen
        name="Poultry"
        component={PoultryManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="pets" color={color} size={size} label={t('nav.manage_poultry') || t('navigation.poultry')} />
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="people" color={color} size={size} label={t('nav.connect') || t('navigation.connect')} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="assessment" color={color} size={size} label={t('nav.reports') || t('navigation.reports')} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="person" color={color} size={size} label={t('nav.profile') || t('navigation.profile')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});


