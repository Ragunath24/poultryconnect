import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ];

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage && supportedLanguages.find(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
        await i18n.changeLanguage(savedLanguage);
      } else {
        // Default to English if no saved language or unsupported language
        setCurrentLanguage('en');
        await i18n.changeLanguage('en');
      }
    } catch (error) {
      console.log('Error loading language:', error);
      setCurrentLanguage('en');
      await i18n.changeLanguage('en');
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (languageCode) => {
    try {
      if (supportedLanguages.find(lang => lang.code === languageCode)) {
        setCurrentLanguage(languageCode);
        await i18n.changeLanguage(languageCode);
        await AsyncStorage.setItem('user-language', languageCode);
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error changing language:', error);
      return false;
    }
  };

  const getCurrentLanguageInfo = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  };

  const isRTL = () => {
    // Currently none of our supported languages are RTL, but this can be extended
    return false;
  };

  const getTextDirection = () => {
    return isRTL() ? 'rtl' : 'ltr';
  };

  const value = {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    getCurrentLanguageInfo,
    isRTL,
    getTextDirection,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
