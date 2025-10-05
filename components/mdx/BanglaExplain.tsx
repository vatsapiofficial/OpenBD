import React from 'react';

export function BanglaExplain({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
      <h3 className="font-bold text-lg mb-2">ব্যাখ্যা (Explanation)</h3>
      {children}
    </div>
  );
}