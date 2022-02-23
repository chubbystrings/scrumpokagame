export const generateFibonacci = (num: number) => {
  let n1 = 0,
    n2 = 1,
    nextTerm;
    const result = []


  nextTerm = n1 + n2;

  while (nextTerm <= num) {
    result.push(nextTerm)

    n1 = n2;
    n2 = nextTerm;
    nextTerm = n1 + n2;
  }

  return result
};
