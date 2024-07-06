export const calculateChange = (amount: number, denominations: number[]): { [key: number]: number } => {
    return denominations
      .sort((a, b) => b - a)
      .reduce((acc, coin) => {
        acc[coin] = Math.floor(amount / coin);
        amount = parseFloat((amount % coin).toFixed(2));
        return acc;
      }, {} as { [key: number]: number });
  };
  