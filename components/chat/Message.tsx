import React from 'react';

export function Message({
  from,
  children,
}: {
  from: 'user' | 'assistant';
  children: React.ReactNode;
}) {
  const isUser = from === 'user';
  return (
    <div
      className={`flex items-start gap-3 p-4 ${
        isUser ? 'justify-end' : ''
      }`}
    >
      <div
        className={`rounded-lg p-3 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        {children}
      </div>
    </div>
  );
}