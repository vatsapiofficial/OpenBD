import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system', 'tool']),
  content: z.string(),
  tool_calls: z.array(z.any()).optional(),
  tool_call_id: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema),
  stream: z.boolean().optional(),
});