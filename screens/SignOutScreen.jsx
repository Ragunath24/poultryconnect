import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignOutScreen({ navigation }) {
  const onConfirm = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign out?</Text>
      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  button: { backgroundColor: '#FF6B35', padding: 12, borderRadius: 8, alignItems: 'center', minWidth: 160, marginVertical: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#FF6B35', marginTop: 8 },
});


