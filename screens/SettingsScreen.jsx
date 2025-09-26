import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, shadows } from '../theme';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();

  const settingsSections = [
    {
      title: t('settings.general'),
      items: [
        {
          icon: 'language',
          title: t('settings.language'),
          subtitle: t('languages.selectLanguage'),
          component: <LanguageSwitcher showLabel={false} />,
          type: 'component'
        },
        {
          icon: 'palette',
          title: t('settings.theme'),
          subtitle: 'Light',
          onPress: () => {},
          type: 'navigation'
        },
        {
          icon: 'attach-money',
          title: t('settings.currency'),
          subtitle: 'NGN (₦)',
          onPress: () => {},
          type: 'navigation'
        }
      ]
    },
    {
      title: t('settings.account'),
      items: [
        {
          icon: 'person',
          title: t('profile.editProfile'),
          subtitle: t('profile.personalInfo'),
          onPress: () => navigation.navigate('Profile'),
          type: 'navigation'
        },
        {
          icon: 'lock',
          title: t('profile.changePassword'),
          subtitle: t('profile.currentPassword'),
          onPress: () => {},
          type: 'navigation'
        },
        {
          icon: 'notifications',
          title: t('settings.notifications'),
          subtitle: t('settings.enableNotifications'),
          onPress: () => {},
          type: 'navigation'
        }
      ]
    },
    {
      title: t('settings.about'),
      items: [
        {
          icon: 'info',
          title: t('settings.about'),
          subtitle: t('settings.version') + ' 1.0.0',
          onPress: () => {},
          type: 'navigation'
        },
        {
          icon: 'help',
          title: t('settings.help'),
          subtitle: t('settings.contactSupport'),
          onPress: () => {},
          type: 'navigation'
        },
        {
          icon: 'privacy-tip',
          title: t('settings.privacy'),
          subtitle: t('settings.privacyPolicy'),
          onPress: () => {},
          type: 'navigation'
        }
      ]
    }
  ];

  const renderSettingItem = (item, index) => {
    if (item.type === 'component') {
      return (
        <View key={index} style={styles.settingItem}>
          <View style={styles.settingItemLeft}>
            <View style={styles.settingIconContainer}>
              <Icon name={item.icon} size={24} color={colors.primary} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
          <View style={styles.settingItemRight}>
            {item.component}
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.settingItemLeft}>
          <View style={styles.settingIconContainer}>
            <Icon name={item.icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <Icon name="keyboard-arrow-right" size={24} color={colors.textMuted} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <Text style={styles.subtitle}>{t('settings.general')}</Text>
      </View>

      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Icon name="logout" size={20} color={colors.surface} />
          <Text style={styles.logoutButtonText}>{t('auth.logout')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
    fontWeight: '600',
  },
  sectionContent: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: 12,
    ...shadows.card,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  settingItemRight: {
    marginLeft: spacing.sm,
  },
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.iconRed,
    paddingVertical: spacing.md,
    borderRadius: 12,
    ...shadows.card,
  },
  logoutButtonText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});
