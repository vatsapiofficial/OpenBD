import React from 'react';

export function Quiz({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
      <h3 className="font-bold text-lg mb-2">Quiz</h3>
      {children}
    </div>
  );
}