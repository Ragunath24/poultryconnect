import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';
import Logo from '../components/Logo';
import CardButton from '../components/CardButton';

export default function DashboardScreen({ navigation }) {
  const marketData = {
    chickenPrice: '₦2,850/kg',
    eggPrice: '₦1,200/crate',
    trend: '+5.2%',
    trendUp: true
  };

  const quickStats = [
    { label: 'Total Birds', value: '1,250', color: colors.primary },
    { label: 'Active Farmers', value: '342', color: colors.success },
    { label: 'Market Price', value: marketData.chickenPrice, color: colors.iconOrange }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Logo size={88} />
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, John!</Text>
      </View>

      {/* Market Overview */}
      <View style={styles.marketCard}>
        <Text style={styles.marketTitle}>Market Overview</Text>
        <View style={styles.marketRow}>
          <View>
            <Text style={styles.marketLabel}>Chicken Price</Text>
            <Text style={styles.marketValue}>{marketData.chickenPrice}</Text>
          </View>
          <View style={styles.trendContainer}>
            <Text style={[styles.trendText, { color: marketData.trendUp ? colors.success : colors.iconRed }]}>
              {marketData.trend}
            </Text>
            <Text style={styles.trendLabel}>vs yesterday</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('MarketPrices')}>
          <Text style={styles.viewAllText}>View All Prices →</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <View key={index} style={[styles.statCard, shadows.card]}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Main Features Grid */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        <CardButton label="Manage Poultry" onPress={() => navigation.navigate('Poultry')} icon={<View style={{ width: 28, height: 28, backgroundColor: colors.iconYellow, borderRadius: 8 }} />} />
        <CardButton label="Market Prices" onPress={() => navigation.navigate('MarketPrices')} icon={<View style={{ width: 28, height: 28, backgroundColor: '#7DD3FC', borderRadius: 8 }} />} />
        <CardButton label="Connect" onPress={() => navigation.navigate('Connect')} icon={<View style={{ width: 28, height: 28, backgroundColor: '#FDE68A', borderRadius: 8 }} />} />
        <CardButton label="Knowledge" onPress={() => navigation.navigate('Knowledge')} icon={<View style={{ width: 28, height: 28, backgroundColor: '#C7D2FE', borderRadius: 8 }} />} />
        <CardButton label="Reports" onPress={() => navigation.navigate('Reports')} icon={<View style={{ width: 28, height: 28, backgroundColor: '#D1FAE5', borderRadius: 8 }} />} />
        <CardButton label="Profile" onPress={() => navigation.navigate('Profile')} icon={<View style={{ width: 28, height: 28, backgroundColor: '#FECACA', borderRadius: 8 }} />} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', paddingTop: spacing.xl, paddingHorizontal: spacing.xl },
  title: { ...typography.h2, textAlign: 'center', marginTop: spacing.md, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs },
  marketCard: { backgroundColor: colors.surface, margin: spacing.xl, padding: spacing.lg, borderRadius: 16, ...shadows.card },
  marketTitle: { ...typography.h3, marginBottom: spacing.md, color: colors.text },
  marketRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  marketLabel: { ...typography.caption, color: colors.textMuted },
  marketValue: { ...typography.h3, color: colors.text, marginTop: spacing.xs },
  trendContainer: { alignItems: 'flex-end' },
  trendText: { ...typography.body, fontWeight: '700' },
  trendLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  viewAllButton: { marginTop: spacing.md, alignSelf: 'flex-end' },
  viewAllText: { color: colors.primary, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginBottom: spacing.lg, gap: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.surface, padding: spacing.md, borderRadius: 12, alignItems: 'center' },
  statValue: { ...typography.h3, fontWeight: '800' },
  statLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center' },
  sectionTitle: { ...typography.h3, marginHorizontal: spacing.xl, marginBottom: spacing.md, color: colors.text },
  grid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingHorizontal: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
});


