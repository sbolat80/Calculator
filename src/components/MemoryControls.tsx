import React from 'react';

interface MemoryControlsProps {
  onMemoryAction: (action: string) => void;
}

export default function MemoryControls({ onMemoryAction }: MemoryControlsProps) {
  const memoryButtons = ['MC', 'MR', 'M+', 'M-'];
  
  return (
    <div className="flex space-x-3">
      {memoryButtons.map((action) => (
        <button
          key={action}
          onClick={() => onMemoryAction(action)}
          className="btn memory"
        >
          {action}
        </button>
      ))}
    </div>
  );
}