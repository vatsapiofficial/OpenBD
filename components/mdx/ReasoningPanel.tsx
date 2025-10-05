import React from 'react';

export function ReasoningPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border-l-4 border-gray-500 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Reasoning</h3>
      {children}
    </div>
  );
}