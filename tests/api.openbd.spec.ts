import { test, expect } from '@playwright/test';

test('API route should return a streaming response', async ({ request }) => {
  const response = await request.post('/api/openbd', {
    data: {
      messages: [{ role: 'user', content: 'Hello' }],
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toBe('text/plain; charset=utf-8');
});