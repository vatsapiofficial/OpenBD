import { tool } from 'ai';
import { z } from 'zod';

export const search = tool({
  description: 'A tool that can search for information on the web.',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    // In a real implementation, this would call a search API.
    console.log(`Searching for: ${query}`);
    return { results: `Search results for "${query}"` };
  },
});