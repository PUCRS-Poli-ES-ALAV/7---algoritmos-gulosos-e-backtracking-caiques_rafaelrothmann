function getChangeGreedy(coins, amount) {
  coins.sort((a, b) => b - a);
  let remaining = amount;
  let result = [];
  let iterations = 0;

  for (let coin of coins) {
    while (remaining >= coin) {
      result.push(coin);
      remaining -= coin;
      iterations++;
    }
  }

  return {
    coinsUsed: result,
    totalCoins: result.length,
    iterations: iterations,
    success: remaining === 0,
    missing: remaining,
  };
}

const availableCoins = [100, 25, 10, 5, 1];
const value = 289;

const change = getChangeGreedy(availableCoins, value);

console.log("Valor do troco: R$" + (value / 100).toFixed(2));
console.log("Lista de moedas usadas:", change.coinsUsed);
console.log("Total de moedas:", change.totalCoins);
console.log("Número de iterações:", change.iterations);

if (change.success) {
  console.log("Conseguiu dar o troco completo.");
} else {
  console.log("Não conseguiu dar o troco completo.");
  console.log("Faltou: R$" + (change.missing / 100).toFixed(2));
}
