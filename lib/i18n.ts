// This is a placeholder for i18n utilities.
// For now, we'll just define the supported locales.

export const supportedLocales = ['en', 'bn'];

export function getLocale(request: Request): string {
  // In a real app, you'd parse the 'accept-language' header
  // or look for a cookie/url param.
  return 'en';
}

export function t(key: string, locale: string = 'en'): string {
  // This would be a real translation function.
  const translations: Record<string, Record<string, string>> = {
    en: {
      'chat.title': 'OpenBD Chat',
    },
    bn: {
      'chat.title': 'ওপেনবিডি চ্যাট',
    },
  };
  return translations[locale]?.[key] || key;
}