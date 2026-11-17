export class Calculadora {
  constructor() {
    //BASE
    // Tabela Salarial 01 PGCS - Analista 8h, vigência 01/05/2026 (ACT 2025/2027)
    // Fonte: https://www.transparencia.serpro.gov.br/acesso-a-informacao/servidores/carreiras/documentos/1-pgcs-tabela-salarial-01-analista-8-horas.pdf
    this.tabelaSalarial = {
      101: { A: 9587.10, B: 9802.82 },
      102: { A: 10018.55, B: 10243.97 },
      103: { A: 10469.40, B: 10704.94 },
      104: { A: 10940.49, B: 11186.67 },
      105: { A: 11432.85, B: 11690.06 },
      106: { A: 11947.30, B: 12216.13 },
      107: { A: 12484.93, B: 12765.82 },
      108: { A: 13046.77, B: 13340.32 },
      109: { A: 13633.86, B: 13940.64 },
      110: { A: 14247.41, B: 14567.94 },
      111: { A: 14888.50, B: 15223.52 },
      112: { A: 15558.52, B: 15908.55 },
      113: { A: 16258.65, B: 16624.46 },
      114: { A: 16990.29, B: 17372.54 },
      115: { A: 17754.82, B: 18154.33 },
      116: { A: 18553.78, B: 18971.28 },
      117: { A: 19388.72, B: 19825.00 },
      118: { A: 20261.21, B: 20717.11 },
      119: { A: 21172.97, B: 21649.37 },
      120: { A: 22125.74, B: 22623.58 },
      121: { A: 23121.43, B: 23641.66 },
      122: { A: 24161.88, B: 24705.50 },
    };
    this.base = this.tabelaSalarial[101].A;
    this.alimentacao = 1375.44;

    //PERCENTUAIS
    this.p_alimentacao = 0.08;
    this.p_fgts = 0.08;

    //IRPF
    this.inss = 988.07; // teto 2026 (R$ 8.475,55)
    this.alicotaIR = 0.275;
    this.baseDeducao = 908.73; // parcela a deduzir 27,5% (tabela desde 05/2025)

    //GRATIFICACAO
    this.p_gratificacao = {
      "Classe I": 0.15,
      "Classe II": 0.2,
      "Classe III": 0.25,
    };
  }

  calcularBase(nivelAtual, degrauAtual) {
    return this.tabelaSalarial[nivelAtual][degrauAtual];
  }

  calcularGratificacao(classe, base) {
    return base * this.p_gratificacao[classe];
  }

  calcularDeducaoAlimentacao(alimentacao) {
    return alimentacao * this.p_alimentacao;
  }

  /** IRPF **/
  calcularIRPF(totalBruto, desconto=0) {
    let result = totalBruto - this.inss -desconto;
    result *= this.alicotaIR;
    result -= this.baseDeducao;

    return result;
  }

  calcularFGTS(totalBruto) {
    return totalBruto * this.p_fgts;
  }

  aplicarReajuste(valor, percentual) {
    return valor * (1 + percentual / 100);
  }
}
