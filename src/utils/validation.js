export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const isValidContact = (contact) => {
  // Basic validation for contact info
  // Check if it has name, phone, or email pattern
  const hasName = /name:/i.test(contact);
  const hasPhone = /tel:|phone:/i.test(contact);
  const hasEmail = /email:/i.test(contact);
  
  return hasName || hasPhone || hasEmail;
};

export const formatContactData = (name, phone, email) => {
  let result = 'BEGIN:VCARD\nVERSION:3.0\n';
  
  if (name) result += `FN:${name}\n`;
  if (phone) result += `TEL:${phone}\n`;
  if (email) result += `EMAIL:${email}\n`;
  
  result += 'END:VCARD';
  return result;
};