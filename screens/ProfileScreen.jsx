import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

export default function ProfileScreen({ navigation }) {
  const userStats = [
    { label: 'Total Birds', value: '1,250' },
    { label: 'Experience', value: '5 years' },
    { label: 'Connections', value: '24' },
    { label: 'Posts', value: '12' }
  ];

  const menuItems = [
    { title: 'Edit Profile', icon: '✏️', onPress: () => {} },
    { title: 'My Connections', icon: '👥', onPress: () => {} },
    { title: 'My Posts', icon: '📝', onPress: () => {} },
    { title: 'Settings', icon: '⚙️', onPress: () => {} },
    { title: 'Help & Support', icon: '❓', onPress: () => {} },
    { title: 'About', icon: 'ℹ️', onPress: () => {} }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userLocation}>Lagos, Nigeria</Text>
        <Text style={styles.userBio}>Passionate poultry farmer with 5 years of experience in broiler production</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {userStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out */}
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={() => navigation.navigate('SignOut')}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', padding: spacing.xl, paddingTop: spacing.xxl },
  avatarContainer: { position: 'relative', marginBottom: spacing.md },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.surface, fontSize: 32, fontWeight: '700' },
  editAvatarButton: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', ...shadows.card },
  editAvatarText: { fontSize: 16 },
  userName: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  userLocation: { ...typography.body, color: colors.textMuted, marginBottom: spacing.sm },
  userBio: { ...typography.body, color: colors.text, textAlign: 'center', lineHeight: 22 },
  statsContainer: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginBottom: spacing.xl, gap: spacing.md },
  statItem: { flex: 1, backgroundColor: colors.surface, padding: spacing.md, borderRadius: 12, alignItems: 'center', ...shadows.card },
  statValue: { ...typography.h3, fontWeight: '800', color: colors.primary },
  statLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center' },
  menuContainer: { backgroundColor: colors.surface, marginHorizontal: spacing.xl, borderRadius: 16, ...shadows.card },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { fontSize: 20, marginRight: spacing.md },
  menuTitle: { ...typography.body, color: colors.text },
  menuArrow: { fontSize: 20, color: colors.textMuted },
  signOutButton: { backgroundColor: colors.iconRed, margin: spacing.xl, padding: spacing.lg, borderRadius: 12, alignItems: 'center' },
  signOutText: { color: colors.surface, fontWeight: '600', fontSize: 16 },
});


