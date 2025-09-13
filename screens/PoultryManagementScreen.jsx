import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PoultryManagementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poultry Management</Text>
      <Text>Manage your flocks, feed, and schedules.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
});


