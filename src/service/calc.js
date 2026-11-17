export class Calculadora {
  constructor() {
    //BASE
    this.base = 9587.1; // Tabela PGCS Analista 8h, vigência 01/05/2026 (ACT 2025/2027)
    this.alimentacao = 1375.44;

    //PERCENTUAIS
    this.p_alimentacao = 0.08;
    this.p_progressao = 0.045;
    this.p_degrau = 0.0225;
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

  calcularBase(nivelInicial, nivelAtual, degrauAtual) {
    const steps = nivelAtual - nivelInicial;
    const txJurosNivel = (1 + this.p_progressao) ** steps;

    let baseReajustado = this.base * txJurosNivel;

    if (degrauAtual === "B") {
      const txJurosDegrau = 1 + this.p_degrau;
      baseReajustado = baseReajustado * txJurosDegrau;
    }

    return baseReajustado;
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
