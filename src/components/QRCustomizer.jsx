import React from 'react';
import { Paintbrush, Maximize, Minimize } from 'lucide-react';

const QRCustomizer = ({
  bgColor,
  fgColor,
  size,
  includeMargin,
  level,
  setBgColor,
  setFgColor,
  setSize,
  setIncludeMargin,
  setLevel,
}) => {
  return (
    <div className="card mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Paintbrush className="w-5 h-5 mr-2 text-primary-500" />
        Customize
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foreground Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="ml-2 input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="ml-2 input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <div className="flex items-center">
            <Minimize className="w-4 h-4 text-gray-500" />
            <input
              type="range"
              min="128"
              max="512"
              step="8"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mx-2 w-full"
            />
            <Maximize className="w-4 h-4 text-gray-500" />
            <span className="ml-2 text-sm text-gray-500 w-12 text-right">
              {size}px
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Error Correction
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['L', 'M', 'Q', 'H'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`btn ${
                  level === l ? 'btn-secondary' : 'btn-outline'
                } text-xs`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            L: Low, M: Medium, Q: Quartile, H: High
          </p>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeMargin}
              onChange={(e) => setIncludeMargin(e.target.checked)}
              className="h-4 w-4 text-primary-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Include margin</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default QRCustomizer;