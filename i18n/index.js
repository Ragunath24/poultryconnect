import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

// Import translation files
import en from './locales/en.json';
import ta from './locales/ta.json';
import hi from './locales/hi.json';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // Try to get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Get device language
      const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode;
      
      // Map device language to supported languages
      const supportedLanguages = ['en', 'ta', 'hi'];
      const detectedLanguage = supportedLanguages.includes(deviceLanguage) 
        ? deviceLanguage 
        : 'en'; // Default to English

      callback(detectedLanguage);
    } catch (error) {
      console.log('Error detecting language:', error);
      callback('en'); // Fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug: __DEV__,
    
    resources: {
      en: { translation: en },
      ta: { translation: ta },
      hi: { translation: hi },
    },

    interpolation: {
      escapeValue: false, // React Native already escapes values
    },

    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

export default i18n;
