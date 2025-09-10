export class InputValidator {
  constructor(animaisValidos) {
    this.nomesAnimaisValidos = Object.keys(animaisValidos);
  }

  validate(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr) {
    const brinquedosPessoa1 = brinquedosPessoa1Str.split(',');
    const brinquedosPessoa2 = brinquedosPessoa2Str.split(',');
    const animaisConsiderados = ordemAnimaisStr.split(',');

    const animaisError = this.validateAnimais(animaisConsiderados);
    if (animaisError) {
      return { error: animaisError };
    }

    const brinquedosError = this.validateBrinquedos(brinquedosPessoa1, brinquedosPessoa2);
    if (brinquedosError) {
      return { error: brinquedosError };
    }

    return {
      data: {
        brinquedosPessoa1,
        brinquedosPessoa2,
        animaisConsiderados,
      }
    };
  }

  validateAnimais(animais) {
    const animaisSet = new Set();
    for (const nome of animais) {
      if (!this.nomesAnimaisValidos.includes(nome) || animaisSet.has(nome)) {
        return { erro: 'Animal inválido' };
      }
      animaisSet.add(nome);
    }
    return null;
  }

  validateBrinquedos(brinquedos1, brinquedos2) {
    const temDuplicados1 = new Set(brinquedos1).size !== brinquedos1.length;
    const temDuplicados2 = new Set(brinquedos2).size !== brinquedos2.length;

    if (temDuplicados1 || temDuplicados2) {
      return { erro: 'Brinquedo inválido' };
    }
    return null;
  }
}