const getNthFobonacciNumber = (n) => {
  return n <= 1
    ? n
    : getNthFobonacciNumber(n - 1) + getNthFobonacciNumber(n - 2);
};

export { getNthFobonacciNumber };
