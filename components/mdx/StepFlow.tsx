import React from 'react';

export function StepFlow({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border-l-4 border-green-500 bg-green-50">
      <h3 className="font-bold text-lg mb-2">Steps</h3>
      {children}
    </div>
  );
}