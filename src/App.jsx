import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import QRInput from './components/QRInput';
import QRCustomizer from './components/QRCustomizer';
import QRDisplay from './components/QRDisplay';
import QRHistory from './components/QRHistory';
import useLocalStorage from './hooks/useLocalStorage';
import { formatContactData } from './utils/validation';

function App() {
  // Input state
  const [content, setContent] = useState('');
  const [inputType, setInputType] = useState('url');
  
  // Customization state
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');
  const [size, setSize] = useState(256);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [level, setLevel] = useState('M');
  
  // QR code state
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [qrHistory, setQRHistory] = useLocalStorage('qr-history', []);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (generated && qrCodeValue) {
      // This ensures live preview after initial generation
    }
  }, [bgColor, fgColor, size, includeMargin, level, generated, qrCodeValue]);

  const handleGenerate = () => {
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    setQRCodeValue(content);
    setGenerated(true);
    
    const newQRCode = {
      id: uuidv4(),
      content,
      type: inputType,
      created: new Date(),
      bgColor,
      fgColor,
      size,
      includeMargin,
      level,
    };
    
    setQRHistory([newQRCode, ...qrHistory.slice(0, 19)]);
    toast.success('QR Code generated successfully!');
  };

  const handleSelectHistory = (item) => {
    setContent(item.content);
    setQRCodeValue(item.content);
    setBgColor(item.bgColor);
    setFgColor(item.fgColor);
    setSize(item.size);
    setIncludeMargin(item.includeMargin);
    setLevel(item.level);
    setInputType(item.type);
    setGenerated(true);
    toast.success('Loaded from history');
  };

  const handleClearHistory = () => {
    setQRHistory([]);
    toast.success('History cleared');
  };

  const handleDownload = (format) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <rect width="100%" height="100%" fill="${bgColor}"/>
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${canvas.outerHTML}
            </div>
          </foreignObject>
        </svg>
      `;
      
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }

    toast.success(`Downloaded as ${format.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <QRInput
              value={content}
              onChange={setContent}
              onGenerate={handleGenerate}
              type={inputType}
              setType={setInputType}
            />
            
            {generated && qrCodeValue && (
              <QRDisplay
                value={qrCodeValue}
                bgColor={bgColor}
                fgColor={fgColor}
                size={size}
                includeMargin={includeMargin}
                level={level}
                onDownload={handleDownload}
              />
            )}
          </div>
          
          <div className="space-y-6">
            <QRCustomizer
              bgColor={bgColor}
              fgColor={fgColor}
              size={size}
              includeMargin={includeMargin}
              level={level}
              setBgColor={setBgColor}
              setFgColor={setFgColor}
              setSize={setSize}
              setIncludeMargin={setIncludeMargin}
              setLevel={setLevel}
            />
            
            <QRHistory
              history={qrHistory}
              onSelect={handleSelectHistory}
              onClear={handleClearHistory}
            />
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;