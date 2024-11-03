import React from 'react';

interface DisplayProps {
  expression: string;
  result: string;
}

export default function Display({ expression, result }: DisplayProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 text-right">
      <div className="text-gray-400 text-sm h-6">{expression}</div>
      <div className="text-white text-3xl font-light tracking-wider overflow-x-auto">
        {result}
      </div>
    </div>
  );
}