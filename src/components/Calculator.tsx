import React, { useState } from 'react';
import { History, Calculator as CalculatorIcon, Trash2, SwitchCamera } from 'lucide-react';
import Display from './Display';
import MemoryControls from './MemoryControls';
import ScientificPad from './ScientificPad';
import NumberPad from './NumberPad';
import HistoryPanel from './HistoryPanel';
import { HistoryEntry } from '../types';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleSpecial = (func: string) => {
    let result = 0;
    const num = parseFloat(display);
    
    switch(func) {
      case 'sin':
        result = Math.sin(num * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(num * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(num * Math.PI / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(num);
        break;
      case 'log':
        result = Math.log10(num);
        break;
      case 'ln':
        result = Math.log(num);
        break;
    }
    
    setDisplay(result.toFixed(8).replace(/\.?0+$/, ''));
  };

  const calculate = () => {
    try {
      const fullExpression = expression + display;
      const result = new Function('return ' + fullExpression)();
      setHistory([{ expression: fullExpression, result: result.toString() }, ...history]);
      setDisplay(result.toString());
      setExpression('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleMemory = (action: string) => {
    const currentValue = parseFloat(display);
    switch(action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        break;
      case 'M+':
        setMemory(memory + currentValue);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="btn memory flex items-center gap-2"
            >
              <SwitchCamera size={16} />
              {isScientific ? 'Basic' : 'Scientific'}
            </button>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="btn memory flex items-center gap-2"
            >
              <History size={16} />
              History
            </button>
          </div>

          <Display expression={expression} result={display} />
          
          <MemoryControls onMemoryAction={handleMemory} />
          
          {isScientific && (
            <ScientificPad onSpecialFunction={handleSpecial} />
          )}
          
          <NumberPad
            onNumber={handleNumber}
            onOperator={handleOperator}
            onEquals={calculate}
          />

          <button
            onClick={clear}
            className="btn clear w-full flex items-center justify-center gap-2"
          >
            <Trash2 size={16} /> Clear
          </button>
        </div>

        <HistoryPanel
          history={history}
          showHistory={showHistory}
        />
      </div>
    </div>
  );
}