import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

export default function ConnectScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const farmers = [
    {
      id: 1,
      name: 'Adebayo Ogunlesi',
      location: 'Lagos, Nigeria',
      experience: '15 years',
      specialty: 'Broiler Production',
      birds: '2,500',
      rating: 4.8,
      avatar: null,
      isOnline: true
    },
    {
      id: 2,
      name: 'Fatima Ibrahim',
      location: 'Kano, Nigeria',
      experience: '8 years',
      specialty: 'Layer Farming',
      birds: '1,800',
      rating: 4.6,
      avatar: null,
      isOnline: false
    },
    {
      id: 3,
      name: 'Chinedu Okoro',
      location: 'Abuja, Nigeria',
      experience: '12 years',
      specialty: 'Mixed Farming',
      birds: '3,200',
      rating: 4.9,
      avatar: null,
      isOnline: true
    },
    {
      id: 4,
      name: 'Grace Adebayo',
      location: 'Ibadan, Nigeria',
      experience: '6 years',
      specialty: 'Organic Poultry',
      birds: '950',
      rating: 4.7,
      avatar: null,
      isOnline: true
    }
  ];

  const filters = ['all', 'broiler', 'layer', 'mixed', 'organic'];

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         farmer.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         farmer.specialty.toLowerCase().includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const renderAvatar = (farmer) => {
    return (
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>{farmer.name.charAt(0)}</Text>
        {farmer.isOnline && <View style={styles.onlineIndicator} />}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Connect</Text>
        <Text style={styles.subtitle}>Find and connect with poultry farmers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search farmers, locations, or specialties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      {/* Filters */}
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

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>342</Text>
          <Text style={styles.statLabel}>Active Farmers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1,250</Text>
          <Text style={styles.statLabel}>Total Birds</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>89%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
      </View>

      {/* Farmers List */}
      <View style={styles.farmersList}>
        {filteredFarmers.map((farmer) => (
          <TouchableOpacity key={farmer.id} style={[styles.farmerCard, shadows.card]}>
            <View style={styles.farmerHeader}>
              {renderAvatar(farmer)}
              <View style={styles.farmerInfo}>
                <Text style={styles.farmerName}>{farmer.name}</Text>
                <Text style={styles.farmerLocation}>{farmer.location}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {farmer.rating}</Text>
                  <Text style={styles.experience}>{farmer.experience} experience</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.farmerDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Specialty</Text>
                <Text style={styles.detailValue}>{farmer.specialty}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Birds</Text>
                <Text style={styles.detailValue}>{farmer.birds}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Community Features */}
      <View style={styles.communityCard}>
        <Text style={styles.communityTitle}>Community Features</Text>
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureButtonText}>Join Discussion Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureButtonText}>Share Best Practices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton}>
          <Text style={styles.featureButtonText}>Find Local Events</Text>
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
  statsContainer: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginBottom: spacing.lg, gap: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.surface, padding: spacing.md, borderRadius: 12, alignItems: 'center', ...shadows.card },
  statValue: { ...typography.h3, fontWeight: '800', color: colors.primary },
  statLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center' },
  farmersList: { paddingHorizontal: spacing.xl },
  farmerCard: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: 12, marginBottom: spacing.md },
  farmerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md, position: 'relative' },
  avatarText: { color: colors.surface, fontWeight: '700', fontSize: 18 },
  onlineIndicator: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success, borderWidth: 2, borderColor: colors.surface },
  farmerInfo: { flex: 1 },
  farmerName: { ...typography.h3, color: colors.text },
  farmerLocation: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  rating: { ...typography.caption, color: colors.text, marginRight: spacing.md },
  experience: { ...typography.caption, color: colors.textMuted },
  connectButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 },
  connectButtonText: { color: colors.surface, fontWeight: '600', fontSize: 12 },
  farmerDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  detailItem: { flex: 1 },
  detailLabel: { ...typography.caption, color: colors.textMuted },
  detailValue: { ...typography.body, color: colors.text, fontWeight: '600', marginTop: spacing.xs },
  communityCard: { backgroundColor: colors.surface, margin: spacing.xl, padding: spacing.lg, borderRadius: 16, ...shadows.card },
  communityTitle: { ...typography.h3, marginBottom: spacing.md, color: colors.text },
  featureButton: { backgroundColor: colors.background, padding: spacing.md, borderRadius: 8, marginBottom: spacing.sm },
  featureButtonText: { ...typography.body, color: colors.text, textAlign: 'center' },
});