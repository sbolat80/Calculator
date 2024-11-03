import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryPanelProps {
  history: HistoryEntry[];
  showHistory: boolean;
}

export default function HistoryPanel({ history, showHistory }: HistoryPanelProps) {
  return (
    <div className={`bg-gray-900 transition-all duration-300 ${
      showHistory ? 'max-h-64' : 'max-h-0'
    } overflow-y-auto`}>
      <div className="p-4 space-y-2">
        {history.map((entry, index) => (
          <div key={index} className="text-gray-300 text-sm">
            <div className="text-gray-400">{entry.expression}</div>
            <div className="text-white">{entry.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}