export const getCosineSimilarity = (vector1: number[], vector2: number[]) => getDotProduct(vector1, vector2) / (getVectorNorm(vector1) * getVectorNorm(vector2));

const getDotProduct = (vector1: number[], vector2: number[]) => {
  if (vector1.length !== vector2.length) {
    throw Error("Cannot get dot product of vectors with differing lengths!");
  }

  let sum: number = 0;
  for (let i = 0; i < vector1.length; i++) {
    sum += (vector1[i] * vector2[i]);
  }
  return sum;
}

const getVectorNorm = (vector: number[]) => Math.sqrt(vector.reduce((sum, num) => sum + (Math.pow(num, 2)), 0));
