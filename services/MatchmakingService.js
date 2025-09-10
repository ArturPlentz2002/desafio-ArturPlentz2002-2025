export class MatchmakingService {
  isMatch(animal, nomeAnimal, brinquedosPessoa, numAnimaisJaAdotados, pessoaJaTemGato) {
    if (animal.especie === 'gato' && pessoaJaTemGato) {
      return false;
    }

    if (nomeAnimal === 'Loco') {
      return this.isLocoMatch(animal, brinquedosPessoa, numAnimaisJaAdotados);
    }
    
    if (this.isPerfectMatch(animal, brinquedosPessoa)) {
      return true;
    }

    if (this.isSubsequenceMatch(animal, brinquedosPessoa)) {
      return true;
    }

    return false;
  }

  isLocoMatch(animal, brinquedosPessoa, numAnimaisJaAdotados) {
    const temCompanhia = numAnimaisJaAdotados > 0;
    const temTodosBrinquedos = animal.brinquedos.every(b => brinquedosPessoa.includes(b));
    return temCompanhia && temTodosBrinquedos;
  }

  isPerfectMatch(animal, brinquedosPessoa) {
    return JSON.stringify(animal.brinquedos) === JSON.stringify(brinquedosPessoa);
  }

  isSubsequenceMatch(animal, brinquedosPessoa) {
    let indiceBrinquedoAnimal = 0;
    for (const brinquedoPessoa of brinquedosPessoa) {
      if (brinquedoPessoa === animal.brinquedos[indiceBrinquedoAnimal]) {
        indiceBrinquedoAnimal++;
      }
      if (indiceBrinquedoAnimal === animal.brinquedos.length) {
        return true;
      }
    }
    return false;
  }
}