function solveNRainhas(n) {
  const tabuleiro = Array(n)
    .fill()
    .map(() => Array(n).fill("."));
  const soluções = [];
  let chamadas = 0;

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
    chamadas++;
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

  console.time(`N-Rainhas n=${n}`);
  resolver();
  console.timeEnd(`N-Rainhas n=${n}`);

  return {
    tipo: `N-Rainhas (n=${n})`,
    soluções: soluções.length,
    chamadas,
  };
}

function encontrarUmSubconjuntoSomaZero(nums) {
  let resultado = null;
  let chamadas = 0;

  function backtrack(inicio, atual, somaAtual) {
    chamadas++;
    if (somaAtual === 0 && atual.length > 0) {
      resultado = [...atual];
      return true;
    }

    for (let i = inicio; i < nums.length; i++) {
      atual.push(nums[i]);
      if (backtrack(i + 1, atual, somaAtual + nums[i])) {
        return true;
      }
      atual.pop();
    }

    return false;
  }

  console.time(`Soma 1 Subconjunto`);
  backtrack(0, [], 0);
  console.timeEnd(`Soma 1 Subconjunto`);

  return {
    tipo: "Subconjunto (um)",
    soluções: resultado ? 1 : 0,
    chamadas,
  };
}

function encontrarTodosSubconjuntosSomaZero(nums) {
  const resultados = [];
  let chamadas = 0;

  function backtrack(inicio, atual, somaAtual) {
    chamadas++;
    if (somaAtual === 0 && atual.length > 0) {
      resultados.push([...atual]);
    }

    for (let i = inicio; i < nums.length; i++) {
      atual.push(nums[i]);
      backtrack(i + 1, atual, somaAtual + nums[i]);
      atual.pop();
    }
  }

  console.time(`Soma Todos Subconjuntos`);
  backtrack(0, [], 0);
  console.timeEnd(`Soma Todos Subconjuntos`);

  return {
    tipo: "Subconjunto (todos)",
    soluções: resultados.length,
    chamadas,
  };
}

const resultados = [];
resultados.push(solveNRainhas(1));
resultados.push(solveNRainhas(2));
resultados.push(solveNRainhas(3));
resultados.push(solveNRainhas(8));
resultados.push(solveNRainhas(12));

resultados.push(encontrarUmSubconjuntoSomaZero([-7, -3, -2, 5, 8]));
resultados.push(encontrarTodosSubconjuntosSomaZero([-7, -3, -2, 5, 8]));

console.log("\n Tabela de Resultados:");
console.table(resultados);
