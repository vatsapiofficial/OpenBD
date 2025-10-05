// Placeholder for retry logic
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: { retries: number; delay: number }
): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < options.retries - 1) {
        await new Promise(resolve => setTimeout(resolve, options.delay));
      }
    }
  }
  throw lastError;
}