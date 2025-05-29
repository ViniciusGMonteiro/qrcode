import React, { useState } from 'react';
import { LinkIcon, Type, User2, Fingerprint } from 'lucide-react';
import { isValidUrl } from '../utils/validation';

const QRInput = ({ value, onChange, onGenerate, type, setType }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (type === 'url' && !isValidUrl(value)) {
      setError('Please enter a valid URL');
      return;
    }
    
    if (type === 'contact' && !name && !phone && !email) {
      setError('Please enter at least one contact detail');
      return;
    }
    
    if (value.trim() === '') {
      setError('Please enter some content');
      return;
    }
    
    setError('');
    onGenerate();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handleContactChange = () => {
    const contactData = [];
    if (name) contactData.push(`NAME:${name}`);
    if (phone) contactData.push(`TEL:${phone}`);
    if (email) contactData.push(`EMAIL:${email}`);
    
    onChange(contactData.join('\n'));
  };

  return (
    <div className="card mb-6">
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => setType('url')}
            className={`btn ${type === 'url' ? 'btn-primary' : 'btn-outline'} flex items-center`}
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            URL
          </button>
          <button
            type="button"
            onClick={() => setType('text')}
            className={`btn ${type === 'text' ? 'btn-primary' : 'btn-outline'} flex items-center`}
          >
            <Type className="w-4 h-4 mr-1" />
            Text
          </button>
          <button
            type="button"
            onClick={() => setType('contact')}
            className={`btn ${type === 'contact' ? 'btn-primary' : 'btn-outline'} flex items-center`}
          >
            <User2 className="w-4 h-4 mr-1" />
            Contact
          </button>
        </div>

        {type === 'contact' ? (
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="input-field"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleContactChange();
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="+1 (123) 456-7890"
                className="input-field"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  handleContactChange();
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                className="input-field"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleContactChange();
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'url' ? 'Enter URL' : 'Enter Text'}
            </label>
            <input
              type={type === 'url' ? 'url' : 'text'}
              id="content"
              placeholder={type === 'url' ? 'https://example.com' : 'Enter your text here'}
              className="input-field"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {error && <p className="mt-2 text-sm text-error-700">{error}</p>}
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="btn btn-primary w-full flex items-center justify-center"
      >
        <Fingerprint className="w-5 h-5 mr-2" />
        Generate QR Code
      </button>
    </div>
  );
};

export default QRInput;