import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { colors, spacing, typography, shadows } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LanguageSwitcher({ style, showLabel = true }) {
  const { t } = useTranslation();
  const { currentLanguage, supportedLanguages, changeLanguage, getCurrentLanguageInfo } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = async (languageCode) => {
    const success = await changeLanguage(languageCode);
    if (success) {
      setModalVisible(false);
    }
  };

  const currentLanguageInfo = getCurrentLanguageInfo();

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        currentLanguage === item.code && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageChange(item.code)}
    >
      <View style={styles.languageInfo}>
        <Text style={[
          styles.languageName,
          currentLanguage === item.code && styles.selectedLanguageName
        ]}>
          {item.nativeName}
        </Text>
        <Text style={[
          styles.languageCode,
          currentLanguage === item.code && styles.selectedLanguageCode
        ]}>
          {item.name}
        </Text>
      </View>
      {currentLanguage === item.code && (
        <Icon name="check" size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Icon name="language" size={20} color={colors.primary} />
        {showLabel && (
          <Text style={styles.languageButtonText}>
            {currentLanguageInfo.nativeName}
          </Text>
        )}
        <Icon name="keyboard-arrow-down" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('languages.selectLanguage')}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={supportedLanguages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
              style={styles.languageList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container styles can be customized via style prop
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  languageButtonText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    ...shadows.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '600',
  },
  closeButton: {
    padding: spacing.xs,
  },
  languageList: {
    maxHeight: 400,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedLanguageItem: {
    backgroundColor: colors.primary + '10',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  selectedLanguageName: {
    color: colors.primary,
    fontWeight: '600',
  },
  languageCode: {
    ...typography.caption,
    color: colors.textMuted,
  },
  selectedLanguageCode: {
    color: colors.primary,
  },
});
