# PoultryConnect i18n Deployment and Testing Guide

## Overview

This guide provides step-by-step instructions for deploying and testing the internationalization (i18n) features in the PoultryConnect application.

## Pre-Deployment Checklist

### 1. Dependencies Installation

```bash
# Install required packages
npm install i18next react-i18next react-native-localize

# For iOS (if using CocoaPods)
cd ios && pod install && cd ..

# Verify installation
npm list i18next react-i18next react-native-localize
```

### 2. Translation Files Verification

```bash
# Check all translation files exist
ls -la i18n/locales/
# Should show: en.json, ta.json, hi.json

# Validate JSON syntax
node -e "console.log('en.json:', JSON.parse(require('fs').readFileSync('i18n/locales/en.json', 'utf8')))"
node -e "console.log('ta.json:', JSON.parse(require('fs').readFileSync('i18n/locales/ta.json', 'utf8')))"
node -e "console.log('hi.json:', JSON.parse(require('fs').readFileSync('i18n/locales/hi.json', 'utf8')))"
```

### 3. Code Integration Verification

```bash
# Check i18n imports in main files
grep -r "useTranslation" screens/
grep -r "LanguageProvider" App.jsx
grep -r "LanguageContext" contexts/
```

## Deployment Steps

### 1. Development Environment Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd PoultryConnect

# 2. Install dependencies
npm install

# 3. Install i18n packages
npm install i18next react-i18next react-native-localize

# 4. Start Metro bundler
npm start

# 5. Run on device/emulator
npm run android  # or npm run ios
```

### 2. Database Migration

```bash
# Update database schema for language preferences
cd backend
npm run migrate

# Verify language preference column exists
psql -d poultryconnect_dev -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'preferred_language';"
```

### 3. Backend API Updates

```bash
# Update backend to handle language preferences
# Add language preference endpoints
# Test API endpoints
curl -X GET http://localhost:3000/api/users/profile
curl -X PUT http://localhost:3000/api/users/language -d '{"language": "ta"}'
```

## Testing Procedures

### 1. Manual Testing Checklist

#### Language Detection and Default Behavior
- [ ] App launches with device language (if supported)
- [ ] App falls back to English for unsupported languages
- [ ] Language preference persists after app restart
- [ ] Language preference syncs with backend

#### Language Switching
- [ ] Language switcher opens correctly
- [ ] All three languages are selectable
- [ ] Language changes immediately throughout app
- [ ] No text remains in previous language
- [ ] Language change is saved to AsyncStorage

#### Content Verification
- [ ] All screens display translated text
- [ ] No missing translation keys (showing as "key.name")
- [ ] Text fits properly in UI components
- [ ] No text overflow or truncation issues
- [ ] Proper text alignment for all languages

#### Navigation and UI
- [ ] Tab navigation labels are translated
- [ ] Button text is translated
- [ ] Form labels and placeholders are translated
- [ ] Error messages are translated
- [ ] Success messages are translated

### 2. Device-Specific Testing

#### Android Testing
```bash
# Test on different Android versions
# Test on different screen sizes
# Test with different system languages

# Commands for testing
npm run android
adb shell am start -n com.poultryconnect/.MainActivity
```

#### iOS Testing
```bash
# Test on different iOS versions
# Test on different device sizes
# Test with different system languages

# Commands for testing
npm run ios
xcrun simctl launch booted com.poultryconnect
```

### 3. Language-Specific Testing

#### English (en)
- [ ] All text displays correctly
- [ ] No translation artifacts
- [ ] Proper grammar and spelling
- [ ] Consistent terminology

#### Tamil (ta)
- [ ] Tamil script renders correctly
- [ ] Proper Tamil grammar and vocabulary
- [ ] Agricultural terms are accurate
- [ ] Text alignment is correct
- [ ] Font supports Tamil characters

#### Hindi (hi)
- [ ] Devanagari script renders correctly
- [ ] Proper Hindi grammar and vocabulary
- [ ] Agricultural terms are accurate
- [ ] Text alignment is correct
- [ ] Font supports Hindi characters

### 4. Performance Testing

```bash
# Test app startup time with different languages
# Test memory usage with language switching
# Test bundle size impact

# Performance monitoring
npm run android --variant=release
npm run ios --configuration=Release
```

## Quality Assurance

### 1. Translation Quality

#### Native Speaker Review
- [ ] Tamil translations reviewed by native Tamil speaker
- [ ] Hindi translations reviewed by native Hindi speaker
- [ ] Agricultural terminology verified by domain experts
- [ ] Cultural appropriateness verified

#### Technical Review
- [ ] No hardcoded strings in code
- [ ] All user-facing text uses translation keys
- [ ] Consistent key naming convention
- [ ] Proper pluralization handling

### 2. UI/UX Testing

#### Layout Testing
```jsx
// Test with different text lengths
const testTranslations = {
  short: t('common.ok'),
  medium: t('dashboard.marketOverview'),
  long: t('knowledge.articleContent')
};

// Verify layouts handle different text lengths
```

#### Accessibility Testing
- [ ] Screen readers work with translated content
- [ ] Text scaling works correctly
- [ ] High contrast mode works
- [ ] VoiceOver/TalkBack compatibility

### 3. Integration Testing

#### Backend Integration
```bash
# Test language preference sync
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}'

curl -X PUT http://localhost:3000/api/users/language \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"language": "ta"}'
```

#### Database Testing
```sql
-- Verify language preferences are stored
SELECT u.email, up.preferred_language 
FROM users u 
JOIN user_profiles up ON u.id = up.user_id 
WHERE up.preferred_language IS NOT NULL;

-- Test language preference updates
UPDATE user_profiles 
SET preferred_language = 'hi' 
WHERE user_id = (SELECT id FROM users WHERE email = 'test@example.com');
```

## Production Deployment

### 1. Build Configuration

#### Android
```bash
# Update android/app/build.gradle
android {
    defaultConfig {
        resConfigs "en", "ta", "hi"
    }
}

# Build release APK
cd android
./gradlew assembleRelease
```

#### iOS
```bash
# Update ios/PoultryConnect/Info.plist
<key>CFBundleLocalizations</key>
<array>
    <string>en</string>
    <string>ta</string>
    <string>hi</string>
</array>

# Build release IPA
cd ios
xcodebuild -workspace PoultryConnect.xcworkspace -scheme PoultryConnect -configuration Release archive
```

### 2. App Store Deployment

#### Google Play Store
- [ ] Update app description with language support
- [ ] Add screenshots in different languages
- [ ] Test on different device configurations
- [ ] Submit for review

#### Apple App Store
- [ ] Update app description with language support
- [ ] Add screenshots in different languages
- [ ] Test on different device configurations
- [ ] Submit for review

### 3. Monitoring and Analytics

#### Language Usage Analytics
```javascript
// Track language usage
import analytics from '@react-native-firebase/analytics';

const trackLanguageUsage = (language) => {
  analytics().logEvent('language_selected', {
    language: language,
    timestamp: new Date().toISOString()
  });
};
```

#### Error Monitoring
```javascript
// Monitor translation errors
const logTranslationError = (key, language) => {
  console.error(`Missing translation: ${key} for language: ${language}`);
  // Send to error tracking service
};
```

## Post-Deployment Verification

### 1. Live Testing

#### User Acceptance Testing
- [ ] Test with real users in each language
- [ ] Collect feedback on translation quality
- [ ] Verify usability in different languages
- [ ] Test on actual devices in target regions

#### Performance Monitoring
- [ ] Monitor app performance metrics
- [ ] Track language switching frequency
- [ ] Monitor error rates by language
- [ ] Check user engagement by language

### 2. Continuous Improvement

#### Translation Updates
```bash
# Process for updating translations
# 1. Update translation files
# 2. Test changes
# 3. Deploy updates
# 4. Monitor for issues
```

#### User Feedback Integration
- [ ] Collect user feedback on translations
- [ ] Update translations based on feedback
- [ ] Improve terminology consistency
- [ ] Add missing translations

## Troubleshooting

### Common Deployment Issues

#### 1. Translation Files Not Loading
```bash
# Check file paths
ls -la i18n/locales/

# Verify JSON syntax
node -e "JSON.parse(require('fs').readFileSync('i18n/locales/en.json'))"

# Check import statements
grep -r "import.*i18n" .
```

#### 2. Language Not Persisting
```bash
# Check AsyncStorage permissions
# Verify language context implementation
# Test on different devices
```

#### 3. Text Overflow Issues
```jsx
// Add responsive text sizing
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
});
```

### Support and Maintenance

#### Documentation Updates
- [ ] Update user documentation
- [ ] Update developer documentation
- [ ] Create language-specific help content
- [ ] Update API documentation

#### Training Materials
- [ ] Create training for support team
- [ ] Document common issues and solutions
- [ ] Create troubleshooting guides
- [ ] Train translators on app context

## Conclusion

This deployment guide ensures a smooth rollout of the internationalization features. Follow each step carefully and verify all checkpoints before proceeding to the next phase.

Key success metrics:
- ✅ All languages working correctly
- ✅ No translation errors in production
- ✅ Positive user feedback
- ✅ Stable performance across languages
- ✅ Successful app store approvals

For additional support or questions, refer to the main i18n implementation guide or contact the development team.
