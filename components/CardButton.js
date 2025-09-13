import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing, shadows, typography } from '../theme';

export default function CardButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, shadows.card]} activeOpacity={0.85}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    width: '48%',
    alignItems: 'center',
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFF4E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: { ...typography.body, color: colors.text },
});


