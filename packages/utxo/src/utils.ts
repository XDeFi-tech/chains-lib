export const stringToHex = (str: string) => {
  return [...str]
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};
