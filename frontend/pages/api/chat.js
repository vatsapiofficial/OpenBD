import { StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export default async function handler(req) {
  const { messages } = await req.json();

  const response = await fetch('http://localhost:3001/api/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'beta',
      stream: true,
      messages,
    }),
  });

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  // Return the streaming response
  return new StreamingTextResponse(response.body);
}