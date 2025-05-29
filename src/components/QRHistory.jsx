import React from 'react';
import { History, Trash2 } from 'lucide-react';
import QRHistoryItem from './QRHistoryItem';

const QRHistory = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center mb-4">
          <History className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">History</h2>
        </div>
        <p className="text-gray-500 text-center py-4">
          Your generated QR codes will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="btn btn-outline py-1 px-2 text-sm flex items-center text-error-700 hover:bg-error-50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </button>
        )}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {history.map((item) => (
          <QRHistoryItem key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default QRHistory;