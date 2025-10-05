# Gemini 2.5 Quickstart with AI SDK

## Why Gemini 2.5?

Gemini 2.5 is Google’s most advanced reasoning model family yet, offering powerful capabilities for:

- Complex reasoning
- Instruction following
- Coding
- Knowledge-intensive tasks

### Model Variants

- **Gemini 2.5 Pro** → Best for coding & advanced tasks
- **Gemini 2.5 Flash** → Fast performance for general everyday use
- **Gemini 2.5 Flash-Lite** → Cost-efficient for large-scale workloads

---

## Setup with AI SDK

Install the AI SDK and Gemini provider:

```bash
pnpm install ai @ai-sdk/google
```

Add your API key:

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

---

## Basic Example

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'Explain the concept of Hilbert space.',
});

console.log(text);
```

---

## Advanced Reasoning (Thinking Mode)

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, reasoning } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'What is the sum of the first 10 prime numbers?',
  providerOptions: {
    google: {
      thinkingConfig: {
        thinkingBudget: 8192,
        includeThoughts: true,
      },
    },
  },
});

console.log(text);      // final answer
console.log(reasoning); // reasoning trace
```

---

## Tool Calling

```ts
import { z } from 'zod';
import { generateText, tool, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';

const result = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string(),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  stopWhen: stepCountIs(5),
});

console.log(result.text);
console.log(result.steps);
```

---

## Google Search Grounding

```ts
import { google } from '@ai-sdk/google';
import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, providerMetadata } = await generateText({
  model: google('gemini-2.5-flash'),
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt: 'Top 5 San Francisco news from the past week (include dates).',
});

const metadata = providerMetadata?.google as GoogleGenerativeAIProviderMetadata | undefined;
console.log(metadata?.groundingMetadata);
console.log(metadata?.safetyRatings);
```

---

## Build a Chat App with Next.js

### API Route (App Router)

```ts
import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

### Client Page

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col max-w-md mx-auto py-24">
      {messages.map(m => (
        <div key={m.id}>{m.role === 'user' ? 'You' : 'Gemini'}: {m.parts[0].text}</div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="border p-2 w-full rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Say something..."
        />
      </form>
    </div>
  );
}
```

---

## Next Steps

1.  Explore the docs: ai-sdk.dev/docs
2.  See examples: ai-sdk.dev/examples
3.  Use templates: vercel.com/templates?type=ai
4.  Learn Gemini provider: Google Generative AI docs