import React from 'react';

interface ScientificPadProps {
  onSpecialFunction: (func: string) => void;
}

export default function ScientificPad({ onSpecialFunction }: ScientificPadProps) {
  const functions = ['sin', 'cos', 'tan', 'sqrt', 'log', 'ln'];
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {functions.map((func) => (
        <button
          key={func}
          onClick={() => onSpecialFunction(func)}
          className="btn function"
        >
          {func}
        </button>
      ))}
    </div>
  );
}