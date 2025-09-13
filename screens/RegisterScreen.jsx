import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../theme';
import Logo from '../components/Logo';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Logo size={112} />
      <Text style={styles.appTitle}>Poultry{"\n"}Connect</Text>

      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Mobile Number" value={email} onChangeText={setEmail} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirm Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={onRegister} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: 'center', backgroundColor: colors.background },
  appTitle: { ...typography.h1, textAlign: 'center', color: colors.text, marginTop: spacing.md, marginBottom: spacing.xl },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, padding: 14, marginBottom: spacing.md, backgroundColor: colors.surface },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.sm },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { color: colors.primary, textAlign: 'center', marginTop: spacing.md },
});


