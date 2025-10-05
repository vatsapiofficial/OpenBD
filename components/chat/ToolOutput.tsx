import React from 'react';

export function ToolOutput({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-gray-100 rounded-lg">{children}</div>;
}