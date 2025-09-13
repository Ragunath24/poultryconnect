import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

export default function KnowledgeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'health', 'feeding', 'breeding', 'diseases', 'equipment'];

  const knowledgeItems = [
    {
      id: 1,
      title: 'Best Practices for Broiler Chicken Health',
      category: 'health',
      author: 'Dr. Adebayo Ogunlesi',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      excerpt: 'Learn about proper vaccination schedules, nutrition requirements, and common health issues in broiler production...'
    },
    {
      id: 2,
      title: 'Optimal Feeding Schedule for Layers',
      category: 'feeding',
      author: 'Fatima Ibrahim',
      likes: 18,
      comments: 12,
      timeAgo: '4 hours ago',
      excerpt: 'Discover the right feeding times, quantities, and nutritional balance for maximum egg production...'
    },
    {
      id: 3,
      title: 'Preventing Common Poultry Diseases',
      category: 'diseases',
      author: 'Chinedu Okoro',
      likes: 31,
      comments: 15,
      timeAgo: '6 hours ago',
      excerpt: 'Essential guide to identifying, preventing, and treating the most common poultry diseases...'
    },
    {
      id: 4,
      title: 'Modern Poultry Equipment Guide',
      category: 'equipment',
      author: 'Grace Adebayo',
      likes: 12,
      comments: 5,
      timeAgo: '1 day ago',
      excerpt: 'Review of the latest poultry farming equipment and technology for improved efficiency...'
    }
  ];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors_map = {
      health: '#D1FAE5',
      feeding: '#FEF3C7',
      breeding: '#DBEAFE',
      diseases: '#FECACA',
      equipment: '#E9D5FF'
    };
    return colors_map[category] || colors.background;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Knowledge Hub</Text>
        <Text style={styles.subtitle}>Share and learn from experienced farmers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles, questions, or topics..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Ask Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Share Knowledge</Text>
        </TouchableOpacity>
      </View>

      {/* Knowledge Items */}
      <View style={styles.knowledgeList}>
        {filteredItems.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.knowledgeCard, shadows.card]}>
            <View style={styles.cardHeader}>
              <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
                <Text style={styles.categoryTagText}>{item.category}</Text>
              </View>
              <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            </View>
            
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemExcerpt}>{item.excerpt}</Text>
            
            <View style={styles.cardFooter}>
              <Text style={styles.author}>By {item.author}</Text>
              <View style={styles.engagement}>
                <View style={styles.engagementItem}>
                  <Text style={styles.engagementText}>👍 {item.likes}</Text>
                </View>
                <View style={styles.engagementItem}>
                  <Text style={styles.engagementText}>💬 {item.comments}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured Topics */}
      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>Featured Topics</Text>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>🐔 Seasonal Poultry Care</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>📊 Market Analysis & Trends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>🌱 Sustainable Farming Practices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>💰 Cost Management Tips</Text>
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
  categoryContainer: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  categoryButton: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20, backgroundColor: colors.surface, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  categoryButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { ...typography.caption, color: colors.textMuted },
  categoryTextActive: { color: colors.surface },
  quickActions: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginBottom: spacing.lg, gap: spacing.md },
  actionButton: { flex: 1, backgroundColor: colors.primary, padding: spacing.md, borderRadius: 12, alignItems: 'center' },
  actionButtonText: { color: colors.surface, fontWeight: '600' },
  knowledgeList: { paddingHorizontal: spacing.xl },
  knowledgeCard: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: 12, marginBottom: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  categoryTag: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 },
  categoryTagText: { ...typography.caption, fontWeight: '600', color: colors.text },
  timeAgo: { ...typography.caption, color: colors.textMuted },
  itemTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  itemExcerpt: { ...typography.body, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.md },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { ...typography.caption, color: colors.textMuted },
  engagement: { flexDirection: 'row', gap: spacing.md },
  engagementItem: { flexDirection: 'row', alignItems: 'center' },
  engagementText: { ...typography.caption, color: colors.textMuted },
  featuredCard: { backgroundColor: colors.surface, margin: spacing.xl, padding: spacing.lg, borderRadius: 16, ...shadows.card },
  featuredTitle: { ...typography.h3, marginBottom: spacing.md, color: colors.text },
  topicItem: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  topicText: { ...typography.body, color: colors.text },
});
