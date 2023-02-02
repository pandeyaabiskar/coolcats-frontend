export const limitCharacter = (
  word: string,
  length: number,
  bothDirection: boolean
) => {
  if (!word) return "";
  if (bothDirection) {
    if (word.length * 2 < length) return word;
    return `${word.substring(0, length)}...${word.substring(
      word.length - length
    )}`;
  }
  return word.length > length ? `${word.substring(0, length)}...` : word;
};
