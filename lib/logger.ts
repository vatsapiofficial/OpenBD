// Placeholder for a logger utility
// In a real app, this would integrate with a logging service
// like Sentry, Logtail, etc.

export const logger = {
  info: (message: string, context?: object) => {
    console.log(`[INFO] ${message}`, context || '');
  },
  warn: (message: string, context?: object) => {
    console.warn(`[WARN] ${message}`, context || '');
  },
  error: (message: string, error: Error, context?: object) => {
    console.error(`[ERROR] ${message}`, error, context || '');
  },
};