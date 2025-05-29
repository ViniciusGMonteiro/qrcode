import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Clock, ExternalLink } from 'lucide-react';

const QRHistoryItem = ({ item, onSelect }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const formatContent = (content, type) => {
    if (type === 'url') {
      try {
        const url = new URL(content);
        return url.hostname;
      } catch {
        return content;
      }
    }
    
    if (type === 'contact') {
      return 'Contact Information';
    }
    
    return content.length > 20 ? content.substring(0, 20) + '...' : content;
  };

  return (
    <div 
      className="card card-hover cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
      onClick={() => onSelect(item)}
    >
      <div className="flex items-center">
        <div className="mr-4">
          <QRCodeCanvas
            value={item.content}
            size={64}
            bgColor={item.bgColor}
            fgColor={item.fgColor}
            level={item.level}
            includeMargin={item.includeMargin}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate flex items-center">
            {item.type === 'url' && <ExternalLink className="w-3 h-3 mr-1 text-primary-500" />}
            {formatContent(item.content, item.type)}
          </p>
          <p className="text-xs text-gray-500 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(item.created)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRHistoryItem;