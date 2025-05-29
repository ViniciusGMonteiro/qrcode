import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

const QRDisplay = ({
  value,
  bgColor,
  fgColor,
  size,
  includeMargin,
  level,
  onDownload,
}) => {
  const qrRef = useRef(null);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'QR Code',
          text: 'Check out this QR code I generated!',
          url: value.startsWith('http') ? value : undefined,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(value);
        alert('Content copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="card flex flex-col items-center">
      <div
        ref={qrRef}
        className="p-4 bg-white rounded-lg shadow-sm mb-4 flex items-center justify-center"
        style={{ minHeight: `${size + 32}px`, minWidth: `${size + 32}px` }}
      >
        <QRCodeCanvas
          value={value || 'https://example.com'}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
          className="transition-all duration-300"
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-center gap-2">
        <button
          onClick={() => onDownload('png')}
          className="btn btn-primary flex-1 flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </button>
        <button
          onClick={() => onDownload('svg')}
          className="btn btn-secondary flex-1 flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </button>
        <button
          onClick={handleShare}
          className="btn btn-accent flex-1 flex items-center justify-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Scan with any QR code reader or camera app
        </p>
      </div>
    </div>
  );
};

export default QRDisplay;