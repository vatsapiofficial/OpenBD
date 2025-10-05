import { test, expect } from '@playwright/test';
import { render } from '@testing-library/react';
import { SafeMdx } from '../lib/mdx';

test.describe('MDX Security', () => {
  test('should not render script tags', () => {
    const maliciousSource = '<script>alert("XSS")</script>';
    const { container } = render(SafeMdx({ source: maliciousSource }));
    const scriptTag = container.querySelector('script');
    expect(scriptTag).toBeNull();
  });

  test('should not allow event handlers', () => {
    const maliciousSource = '<img src="x" onerror="alert(\'XSS\')" />';
    const { container } = render(SafeMdx({ source: maliciousSource }));
    const imgTag = container.querySelector('img');
    expect(imgTag?.getAttribute('onerror')).toBeNull();
  });
});