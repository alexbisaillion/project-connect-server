import { Attribute } from "../types/attributes";

export const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomAttribute = (attributes: any[]) => attributes[Math.floor(Math.random() * attributes.length)];

export const getRandomAttributes = (attributes: string[]): Attribute[] => {
  const numAttributes = getRandomNum(Math.min(attributes.length, 3), Math.min(attributes.length, 8));
  const chosenAttributes: Attribute[] = [];
  for (let i = 0; i < numAttributes; i++) {
    const attribute = getRandomAttribute(attributes);
    if (chosenAttributes.some(att => att.name === attribute)) {
      i--;
      continue;
    }
    chosenAttributes.push({ name: attribute, votes: 0});
  }
  return chosenAttributes;
}

export const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const convertToTitle = (str: string) => str.split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");