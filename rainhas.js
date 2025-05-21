function solveNRainhas(n) {
  const tabuleiro = Array(n)
    .fill()
    .map(() => Array(n).fill("."));
  const soluções = [];

  function podeColocar(linha, coluna) {
    for (let i = 0; i < linha; i++) {
      if (tabuleiro[i][coluna] === "Q") return false;
    }

    for (let i = linha - 1, j = coluna - 1; i >= 0 && j >= 0; i--, j--) {
      if (tabuleiro[i][j] === "Q") return false;
    }

    for (let i = linha - 1, j = coluna + 1; i >= 0 && j < n; i--, j++) {
      if (tabuleiro[i][j] === "Q") return false;
    }

    return true;
  }

  function resolver(linha = 0) {
    if (linha === n) {
      const solução = tabuleiro.map((row) => row.join(""));
      soluções.push(solução);
      return;
    }

    for (let coluna = 0; coluna < n; coluna++) {
      if (podeColocar(linha, coluna)) {
        tabuleiro[linha][coluna] = "Q";
        resolver(linha + 1);
        tabuleiro[linha][coluna] = ".";
      }
    }
  }

  resolver();

  if (soluções.length > 0) {
    console.log(`Solução para n = ${n}:`);
    soluções[0].forEach((row) => console.log(row));
  } else {
    console.log(`Nenhuma solução para n = ${n}`);
  }

  return soluções;
}

solveNRainhas(8);
solveNRainhas(12);
solveNRainhas(1);
solveNRainhas(2);
solveNRainhas(3);
