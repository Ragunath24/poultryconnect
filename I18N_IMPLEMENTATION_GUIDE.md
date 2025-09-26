# PoultryConnect Internationalization (i18n) Implementation Guide

## Overview

This document provides a comprehensive guide for the internationalization (i18n) implementation in the PoultryConnect application. The app now supports three languages: English, Tamil (தமிழ்), and Hindi (हिन्दी).

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Setup and Installation](#setup-and-installation)
3. [Translation Files Structure](#translation-files-structure)
4. [Component Integration](#component-integration)
5. [Language Switching](#language-switching)
6. [Database Integration](#database-integration)
7. [Testing Guidelines](#testing-guidelines)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Future Enhancements](#future-enhancements)

## Architecture Overview

### Technology Stack

- **i18next**: Core internationalization framework
- **react-i18next**: React integration for i18next
- **react-native-localize**: Device locale detection
- **AsyncStorage**: Language preference persistence

### Key Components

1. **i18n/index.js**: Main i18n configuration
2. **contexts/LanguageContext.js**: Language state management
3. **components/LanguageSwitcher.js**: Language selection UI
4. **i18n/locales/**: Translation files directory

## Setup and Installation

### 1. Install Dependencies

```bash
npm install i18next react-i18next react-native-localize
```

### 2. iOS Configuration (if needed)

For iOS, add to `ios/PoultryConnect/Info.plist`:

```xml
<key>CFBundleLocalizations</key>
<array>
    <string>en</string>
    <string>ta</string>
    <string>hi</string>
</array>
```

### 3. Android Configuration (if needed)

For Android, add to `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">PoultryConnect</string>
</resources>
```

## Translation Files Structure

### File Organization

```
i18n/
├── index.js                 # Main i18n configuration
└── locales/
    ├── en.json             # English translations
    ├── ta.json             # Tamil translations
    └── hi.json             # Hindi translations
```

### Translation Key Structure

```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  },
  "auth": {
    "login": "Login",
    "register": "Register"
  },
  "dashboard": {
    "title": "Dashboard",
    "goodMorning": "Good morning!"
  }
}
```

### Supported Languages

| Language | Code | Native Name | Status |
|----------|------|-------------|---------|
| English  | en   | English     | ✅ Complete |
| Tamil    | ta   | தமிழ்      | ✅ Complete |
| Hindi    | hi   | हिन्दी     | ✅ Complete |

## Component Integration

### 1. Basic Usage

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('common.loading')}</Text>
  );
}
```

### 2. With Parameters

```jsx
// Translation file
{
  "validation": {
    "minLength": "Minimum length is {{count}} characters"
  }
}

// Component
<Text>{t('validation.minLength', { count: 6 })}</Text>
```

### 3. Pluralization

```jsx
// Translation file
{
  "items": {
    "zero": "No items",
    "one": "One item",
    "other": "{{count}} items"
  }
}

// Component
<Text>{t('items', { count: items.length })}</Text>
```

### 4. Date and Number Formatting

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat(i18n.language).format(date);
  };
  
  const formatNumber = (number) => {
    return new Intl.NumberFormat(i18n.language).format(number);
  };
  
  return (
    <View>
      <Text>{formatDate(new Date())}</Text>
      <Text>{formatNumber(1234.56)}</Text>
    </View>
  );
}
```

## Language Switching

### 1. Language Context Usage

```jsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { 
    currentLanguage, 
    supportedLanguages, 
    changeLanguage 
  } = useLanguage();
  
  const handleLanguageChange = async (languageCode) => {
    const success = await changeLanguage(languageCode);
    if (success) {
      console.log('Language changed successfully');
    }
  };
  
  return (
    <View>
      <Text>Current: {currentLanguage}</Text>
      {supportedLanguages.map(lang => (
        <TouchableOpacity 
          key={lang.code}
          onPress={() => handleLanguageChange(lang.code)}
        >
          <Text>{lang.nativeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

### 2. Language Switcher Component

```jsx
import LanguageSwitcher from '../components/LanguageSwitcher';

function SettingsScreen() {
  return (
    <View>
      <LanguageSwitcher showLabel={true} />
    </View>
  );
}
```

## Database Integration

### 1. User Language Preference

The database schema includes language preferences:

```sql
-- User profiles table
CREATE TABLE user_profiles (
    -- ... other fields
    preferred_language VARCHAR(10) DEFAULT 'en' 
        CHECK (preferred_language IN ('en', 'ta', 'hi')),
    -- ... other fields
);
```

### 2. Backend API Integration

```javascript
// Update user language preference
app.put('/api/users/:id/language', async (req, res) => {
  const { language } = req.body;
  const { id } = req.params;
  
  try {
    await query(
      'UPDATE user_profiles SET preferred_language = $1 WHERE user_id = $2',
      [language, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Testing Guidelines

### 1. Manual Testing Checklist

#### Language Switching
- [ ] App starts with correct default language
- [ ] Language switcher opens modal correctly
- [ ] All languages are selectable
- [ ] Language change persists after app restart
- [ ] All UI elements update immediately

#### Content Verification
- [ ] All text is translated (no missing keys)
- [ ] No text overflow in different languages
- [ ] Proper text alignment for RTL languages (future)
- [ ] Date and number formatting works correctly

#### Device Integration
- [ ] App respects device language settings
- [ ] Fallback to English works for unsupported languages
- [ ] Language detection works on first launch

### 2. Automated Testing

```javascript
// Example test for language switching
import { render, fireEvent } from '@testing-library/react-native';
import { LanguageProvider } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

test('language switcher changes language', async () => {
  const { getByText } = render(
    <LanguageProvider>
      <LanguageSwitcher />
    </LanguageProvider>
  );
  
  fireEvent.press(getByText('தமிழ்'));
  
  // Verify language change
  expect(getByText('டாஷ்போர்டு')).toBeTruthy();
});
```

### 3. Translation Coverage

```bash
# Check for missing translations
npm run i18n:check

# Validate translation files
npm run i18n:validate
```

## Best Practices

### 1. Translation Key Naming

```javascript
// ✅ Good: Hierarchical and descriptive
t('dashboard.marketOverview')
t('auth.login')
t('validation.emailRequired')

// ❌ Bad: Flat and unclear
t('title1')
t('text')
t('button')
```

### 2. Text Content Guidelines

#### English (Source Language)
- Use clear, concise language
- Avoid idioms and cultural references
- Use consistent terminology
- Keep sentences short and simple

#### Tamil Translation
- Use formal Tamil (செந்தமிழ்)
- Maintain agricultural terminology
- Consider regional variations
- Test with native speakers

#### Hindi Translation
- Use standard Hindi (खड़ी बोली)
- Maintain technical accuracy
- Consider Devanagari script rendering
- Test with native speakers

### 3. UI Considerations

```jsx
// ✅ Good: Flexible layout
<View style={styles.container}>
  <Text style={styles.title} numberOfLines={2}>
    {t('dashboard.title')}
  </Text>
</View>

// ❌ Bad: Fixed width
<View style={{ width: 100 }}>
  <Text>{t('dashboard.title')}</Text>
</View>
```

### 4. Performance Optimization

```jsx
// ✅ Good: Lazy loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// ✅ Good: Memoization
const TranslatedText = React.memo(({ translationKey }) => {
  const { t } = useTranslation();
  return <Text>{t(translationKey)}</Text>;
});
```

## Troubleshooting

### Common Issues

#### 1. Translation Not Loading

```javascript
// Check i18n initialization
console.log('Current language:', i18n.language);
console.log('Available resources:', i18n.getResourceBundle(i18n.language));

// Verify translation key exists
console.log('Translation exists:', t('your.key') !== 'your.key');
```

#### 2. Language Not Persisting

```javascript
// Check AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.getItem('user-language')
  .then(language => console.log('Stored language:', language));
```

#### 3. Text Overflow Issues

```jsx
// Use flexible layouts
<Text style={styles.text} numberOfLines={0} adjustsFontSizeToFit>
  {t('long.text')}
</Text>

// Or use ellipsis
<Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
  {t('long.text')}
</Text>
```

#### 4. Missing Translations

```javascript
// Add fallback handling
const getTranslation = (key, fallback = '') => {
  const translation = t(key);
  return translation === key ? fallback : translation;
};
```

### Debug Mode

```javascript
// Enable i18n debug mode
i18n.init({
  debug: __DEV__,
  // ... other options
});
```

## Future Enhancements

### 1. Additional Languages

To add a new language:

1. Create translation file: `i18n/locales/[code].json`
2. Update supported languages in `LanguageContext.js`
3. Add language to database schema
4. Update documentation

### 2. RTL Support

For right-to-left languages:

```jsx
// Add RTL detection
const isRTL = () => {
  return ['ar', 'he', 'fa'].includes(currentLanguage);
};

// Apply RTL styles
const styles = StyleSheet.create({
  container: {
    flexDirection: isRTL() ? 'row-reverse' : 'row',
  },
});
```

### 3. Dynamic Content Translation

```javascript
// API-based translations
const loadDynamicTranslations = async () => {
  const response = await fetch('/api/translations');
  const translations = await response.json();
  i18n.addResourceBundle('en', 'translation', translations);
};
```

### 4. Translation Management

- Integration with translation services (Crowdin, Lokalise)
- Automated translation updates
- Translation quality metrics
- A/B testing for translations

## Conclusion

The PoultryConnect application now has comprehensive internationalization support for English, Tamil, and Hindi. The implementation follows React Native best practices and provides a solid foundation for future language additions and enhancements.

Key benefits:
- ✅ Seamless language switching
- ✅ Persistent language preferences
- ✅ Comprehensive translation coverage
- ✅ Database integration
- ✅ Performance optimized
- ✅ Extensible architecture

For questions or issues, refer to the troubleshooting section or contact the development team.
