import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, shadows } from '../theme';
import Logo from '../components/Logo';
import CardButton from '../components/CardButton';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const { t } = useTranslation();
  
  const marketData = {
    chickenPrice: '₦2,850/kg',
    eggPrice: '₦1,200/crate',
    trend: '+5.2%',
    trendUp: true
  };

  const quickStats = [
    { label: t('dashboard.total_birds'), value: '1,250', color: colors.primary, icon: '🐔' },
    { label: t('dashboard.active_farmers'), value: '342', color: colors.success, icon: '👥' },
    { label: t('dashboard.market_price'), value: marketData.chickenPrice, color: colors.iconOrange, icon: '📈' }
  ];

  const quickActions = [
    { label: t('nav.manage_poultry'), onPress: () => navigation.navigate('Poultry'), icon: '🐔', color: '#FFD58A' },
    { label: t('nav.market_prices'), onPress: () => navigation.navigate('MarketPrices'), icon: '💰', color: '#7DD3FC' },
    { label: t('nav.connect'), onPress: () => navigation.navigate('Connect'), icon: '🤝', color: '#FDE68A' },
    { label: t('nav.knowledge'), onPress: () => navigation.navigate('Knowledge'), icon: '📚', color: '#C7D2FE' },
    { label: t('nav.reports'), onPress: () => navigation.navigate('Reports'), icon: '📊', color: '#D1FAE5' },
    { label: t('nav.profile'), onPress: () => navigation.navigate('Profile'), icon: '👤', color: '#FECACA' }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Logo size={60} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{t('dashboard.greeting')}</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <LanguageSwitcher />
        </View>
        <Text style={styles.dashboardTitle}>{t('dashboard.title')}</Text>
      </View>

      {/* Enhanced Market Overview */}
      <View style={styles.marketCard}>
        <View style={styles.marketHeader}>
          <Text style={styles.marketTitle}>{t('dashboard.market_overview')}</Text>
          <View style={styles.trendBadge}>
            <Text style={[styles.trendText, { color: marketData.trendUp ? colors.success : colors.iconRed }]}>
              {marketData.trend}
            </Text>
          </View>
        </View>
        
        <View style={styles.marketContent}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>{t('dashboard.chicken_price')}</Text>
            <Text style={styles.priceValue}>{marketData.chickenPrice}</Text>
            <Text style={styles.priceSubtext}>{t('dashboard.vs_yesterday')}</Text>
          </View>
          
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>{t('dashboard.egg_price')}</Text>
            <Text style={styles.priceValue}>{marketData.eggPrice}</Text>
            <Text style={styles.priceSubtext}>{t('dashboard.per_crate')}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('MarketPrices')}>
          <Text style={styles.viewAllText}>{t('dashboard.view_all_prices')}</Text>
        </TouchableOpacity>
      </View>

      {/* Enhanced Quick Stats */}
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <View key={index} style={[styles.statCard, shadows.card]}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
            </View>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Enhanced Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>{t('dashboard.quick_actions')}</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.actionCard, shadows.card]} 
              onPress={action.onPress}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  
  // Header Styles
  header: { 
    paddingTop: spacing.xl + 10, 
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg
  },
  logoContainer: {
    marginRight: spacing.md
  },
  headerText: {
    flex: 1
  },
  greeting: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 14
  },
  userName: {
    ...typography.h3,
    color: colors.text,
    marginTop: 2
  },
  dashboardTitle: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm
  },

  // Market Card Styles
  marketCard: { 
    backgroundColor: colors.surface, 
    marginHorizontal: spacing.xl, 
    marginBottom: spacing.lg,
    padding: spacing.lg, 
    borderRadius: 20, 
    ...shadows.card 
  },
  marketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg
  },
  marketTitle: { 
    ...typography.h3, 
    color: colors.text 
  },
  trendBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12
  },
  trendText: { 
    ...typography.caption, 
    fontWeight: '700',
    fontSize: 12
  },
  marketContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg
  },
  priceSection: {
    flex: 1,
    alignItems: 'center'
  },
  priceLabel: { 
    ...typography.caption, 
    color: colors.textMuted,
    marginBottom: spacing.xs
  },
  priceValue: { 
    ...typography.h3, 
    color: colors.text,
    fontWeight: '800',
    marginBottom: 2
  },
  priceSubtext: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12
  },
  viewAllButton: { 
    alignSelf: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: 25
  },
  viewAllText: { 
    color: colors.surface, 
    fontWeight: '600',
    fontSize: 14
  },

  // Stats Styles
  statsContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: spacing.xl, 
    marginBottom: spacing.xl, 
    gap: spacing.md 
  },
  statCard: { 
    flex: 1, 
    backgroundColor: colors.surface, 
    padding: spacing.lg, 
    borderRadius: 16, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm
  },
  statIcon: {
    fontSize: 20
  },
  statValue: { 
    ...typography.h3, 
    fontWeight: '800',
    marginBottom: spacing.xs
  },
  statLabel: { 
    ...typography.caption, 
    color: colors.textMuted, 
    textAlign: 'center',
    fontSize: 12
  },

  // Actions Styles
  actionsSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl
  },
  sectionTitle: { 
    ...typography.h3, 
    marginBottom: spacing.lg, 
    color: colors.text 
  },
  actionsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: spacing.md
  },
  actionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm
  },
  actionIcon: {
    fontSize: 24
  },
  actionLabel: {
    ...typography.caption,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600'
  }
});


