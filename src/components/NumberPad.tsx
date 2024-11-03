import React from 'react';

interface NumberPadProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onEquals: () => void;
}

export default function NumberPad({ onNumber, onOperator, onEquals }: NumberPadProps) {
  const buttons = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'];
  
  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => {
            if (btn === '=') onEquals();
            else if (['+', '-', '×', '÷'].includes(btn)) 
              onOperator(btn === '×' ? '*' : btn === '÷' ? '/' : btn);
            else onNumber(btn);
          }}
          className={`btn ${
            btn === '=' ? 'equals' :
            ['+', '-', '×', '÷'].includes(btn) ? 'operator' : ''
          }`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}