import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radii, typography } from '../theme';
import Logo from '../components/Logo';

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Logo size={112} />
      <Text style={styles.appTitle}>Poultry{"\n"}Connect</Text>

      <TextInput
        placeholder={t('auth.mobileNumber')}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <View style={styles.passwordRow}>
        <TextInput
          placeholder={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onLogin} activeOpacity={0.9}>
        <Text style={styles.buttonText}>{t('auth.login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgot}>{t('auth.forgotPassword')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>{t('auth.createAccount')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: 'center', backgroundColor: colors.background },
  appTitle: { ...typography.h1, textAlign: 'center', color: colors.text, marginTop: spacing.md, marginBottom: spacing.xl },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, padding: 14, marginBottom: spacing.md, backgroundColor: colors.surface },
  passwordRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.sm },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  forgot: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.md },
  link: { color: colors.primary, textAlign: 'center', marginTop: spacing.md },
});


