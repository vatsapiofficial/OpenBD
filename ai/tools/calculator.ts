import { tool } from 'ai';
import { z } from 'zod';

export const calculator = tool({
  description: 'A simple calculator that can perform addition, subtraction, multiplication, and division.',
  parameters: z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
    a: z.number(),
    b: z.number(),
  }),
  execute: async ({ operation, a, b }) => {
    switch (operation) {
      case 'add':
        return { result: a + b };
      case 'subtract':
        return { result: a - b };
      case 'multiply':
        return { result: a * b };
      case 'divide':
        if (b === 0) {
          return { error: 'Cannot divide by zero' };
        }
        return { result: a / b };
      default:
        return { error: 'Unknown operation' };
    }
  },
});