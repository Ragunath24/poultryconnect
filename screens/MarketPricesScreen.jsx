import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

export default function MarketPricesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const priceData = [
    { id: 1, product: 'Broiler Chicken', price: '₦2,850/kg', change: '+5.2%', trend: 'up', location: 'Lagos' },
    { id: 2, product: 'Layer Eggs', price: '₦1,200/crate', change: '-2.1%', trend: 'down', location: 'Abuja' },
    { id: 3, product: 'Turkey', price: '₦4,500/kg', change: '+1.8%', trend: 'up', location: 'Kano' },
    { id: 4, product: 'Duck', price: '₦3,200/kg', change: '+0.5%', trend: 'up', location: 'Port Harcourt' },
    { id: 5, product: 'Quail Eggs', price: '₦800/tray', change: '-1.2%', trend: 'down', location: 'Ibadan' },
  ];

  const filters = ['all', 'chicken', 'eggs', 'other'];

  const filteredData = priceData.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'chicken' && item.product.toLowerCase().includes('chicken')) ||
                         (selectedFilter === 'eggs' && item.product.toLowerCase().includes('egg')) ||
                         (selectedFilter === 'other' && !item.product.toLowerCase().includes('chicken') && !item.product.toLowerCase().includes('egg'));
    return matchesSearch && matchesFilter;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Prices</Text>
        <Text style={styles.subtitle}>Real-time poultry market data</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products or locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Price Alerts */}
      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>Price Alerts</Text>
        <Text style={styles.alertText}>Get notified when prices change significantly</Text>
        <TouchableOpacity style={styles.alertButton}>
          <Text style={styles.alertButtonText}>Set Alert</Text>
        </TouchableOpacity>
      </View>

      {/* Price List */}
      <View style={styles.priceList}>
        {filteredData.map((item) => (
          <View key={item.id} style={[styles.priceCard, shadows.card]}>
            <View style={styles.priceHeader}>
              <Text style={styles.productName}>{item.product}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>{item.price}</Text>
              <View style={styles.changeContainer}>
                <Text style={[
                  styles.changeText,
                  { color: item.trend === 'up' ? colors.success : colors.iconRed }
                ]}>
                  {item.change}
                </Text>
                <Text style={styles.changeLabel}>vs yesterday</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Market Trends */}
      <View style={styles.trendsCard}>
        <Text style={styles.trendsTitle}>Market Trends</Text>
        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>7-day average</Text>
          <Text style={styles.trendValue}>+2.3%</Text>
        </View>
        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>30-day average</Text>
          <Text style={styles.trendValue}>+4.1%</Text>
        </View>
        <TouchableOpacity style={styles.viewChartButton}>
          <Text style={styles.viewChartText}>View Detailed Chart →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.xl, paddingTop: spacing.xxl },
  title: { ...typography.h2, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs },
  searchContainer: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  searchInput: { backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  filterContainer: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  filterButton: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20, backgroundColor: colors.surface, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  filterButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { ...typography.caption, color: colors.textMuted },
  filterTextActive: { color: colors.surface },
  alertCard: { backgroundColor: colors.surface, margin: spacing.xl, padding: spacing.lg, borderRadius: 16, ...shadows.card },
  alertTitle: { ...typography.h3, marginBottom: spacing.xs, color: colors.text },
  alertText: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  alertButton: { backgroundColor: colors.primary, padding: spacing.sm, borderRadius: 8, alignSelf: 'flex-start' },
  alertButtonText: { color: colors.surface, fontWeight: '600' },
  priceList: { paddingHorizontal: spacing.xl },
  priceCard: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: 12, marginBottom: spacing.md },
  priceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  productName: { ...typography.h3, color: colors.text },
  locationContainer: { backgroundColor: colors.background, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 },
  locationText: { ...typography.caption, color: colors.textMuted },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceValue: { ...typography.h3, color: colors.text, fontWeight: '800' },
  changeContainer: { alignItems: 'flex-end' },
  changeText: { ...typography.body, fontWeight: '700' },
  changeLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  trendsCard: { backgroundColor: colors.surface, margin: spacing.xl, padding: spacing.lg, borderRadius: 16, ...shadows.card },
  trendsTitle: { ...typography.h3, marginBottom: spacing.md, color: colors.text },
  trendItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  trendLabel: { ...typography.body, color: colors.textMuted },
  trendValue: { ...typography.body, fontWeight: '700', color: colors.success },
  viewChartButton: { marginTop: spacing.md, alignSelf: 'flex-end' },
  viewChartText: { color: colors.primary, fontWeight: '600' },
});
