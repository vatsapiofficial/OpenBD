import React from 'react';

export function Conversation({ children }: { children: React.ReactNode }) {
  return <div className="h-full flex flex-col">{children}</div>;
}