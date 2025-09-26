### Internationalization Plan: English, Tamil, Hindi

This document outlines how multilingual support (en, ta, hi) is integrated, translated, tested, and deployed.

### Stack and Structure
- Library: i18next + react-i18next, device locale via react-native-localize
- Files:
  - `i18n/index.js` – initialization and language detection
  - `i18n/locales/en.json`, `i18n/locales/ta.json`, `i18n/locales/hi.json`
  - `components/LanguageSwitcher.js` – in-app language switching

### Integration Steps
1) Dependencies: i18next, react-i18next, react-native-localize
2) Initialize i18n in `i18n/index.js`, import once in `App.jsx`
3) Replace literals with `useTranslation().t()` on screens/components
4) Add `LanguageSwitcher` to a visible location (dashboard header)
5) Keep keys consistent across locales; add missing keys to all JSONs

### Translation Coverage
- Dashboard, Market Prices, Poultry Management already use `t()`
- Tab labels translated in `components/BottomTabNavigator.js`
- Extend to remaining screens: Login, Register, Profile, Reports, Connect, Knowledge

### Key Guidelines
- Keys use snake_case under feature namespaces (dashboard.*, market.*, nav.*)
- Never interpolate raw user content as keys; only as values (e.g., `t('greeting', { name })`)
- Favor short, reusable phrases in `common.*`

### Testing
- Manual: switch device/system language; verify copy across screens
- In-app: use `LanguageSwitcher` to toggle en/ta/hi
- RTL: Hindi/Tamil are LTR; no RTL flipping required
- Snapshot tests: render screens with mocked i18n context and assert strings

### Deployment
- No native changes required; JS-only
- Over-the-air updates possible for copy changes
- Ensure bundler includes JSON assets (metro handles by default)

### Accessibility
- Verify dynamic type doesn’t truncate translations
- Keep contrast and space for longer strings (Tamil/Hindi expand)

### Maintenance
- Centralize all strings in locale JSONs
- Lint for unused keys periodically
- When adding features, add keys in en, then ta/hi before merging

### Known Follow-ups
- Translate remaining screens and components
- Add date/number formatting with i18next-resources if needed

