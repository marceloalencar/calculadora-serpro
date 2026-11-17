export class PlanoSaude {
  constructor() {
    this.faixas = [
      "0 – 18",
      "19 – 23",
      "24 – 28",
      "29 – 33",
      "34 – 38",
      "39 – 43",
      "44 – 48",
      "49 – 53",
      "54 – 58",
      "59 ou mais",
    ];
    this.mensalidades = [
      748.65, 786.43, 885.49, 1032.47, 1118.07, 1142.09, 1352.1, 1407.69,
      1584.19, 2442.22,
    ];

    //101-8A - 104-8B => [0]
    //105-8A - 122-8B => [1]
    //Vigência: dezembro/2025 (Analista 8h)
    this.participacao = [590.15, 473.01];
    this.mensalidadeMinima = [168.3, 184.52];

    //Plano odontológico: valor fixo mensal
    this.odontologico = 5.33;
  }

  calculate({ nivel, idade }) {
    const grupo = nivel < 105 ? 0 : 1;
    const participacao = this.participacao[grupo];

    const faixaIndex = this._parseFaixa(idade);
    const mensalidade = this.mensalidades[faixaIndex];

    return {
      mensalidade: mensalidade,
      participacao: participacao,
      desconto: Math.max(
        mensalidade - participacao,
        this.mensalidadeMinima[grupo]
      ),
    };
  }

  _parseFaixa(idade) {
    const faixa = Math.min(Math.ceil((idade - 18) / 5), 9);
    return Math.max(faixa, 0);
  }

  faixas() {
    return this.faixas;
  }
}
