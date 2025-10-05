// Placeholder for the <ReasoningPanel /> component

import { useState } from 'react';

export default function ReasoningPanel({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="reasoning-panel">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide Reasoning' : 'Show Reasoning'}
      </button>
      {isOpen && <div className="reasoning-content">{children}</div>}
    </div>
  );
}