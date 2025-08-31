export const convertDriveLink = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url; // return original if not a Drive link
};


