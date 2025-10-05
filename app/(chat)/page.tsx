'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({ api: '/api/openbd' });

  return (
    <div className="flex flex-col max-w-md mx-auto py-24">
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'You' : 'Gemini'}:{' '}
          {m.content}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ role: 'user', content: input });
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