import { InputValidator } from './services/InputValidator.js';
import { MatchmakingService } from './services/MatchmakingService.js';

class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { especie: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { especie: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { especie: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };

    this.validator = new InputValidator(this.animais);
    this.matchmaker = new MatchmakingService();
  }

  encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr) {
    const validationResult = this.validator.validate(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr);
    if (validationResult.error) {
      return validationResult.error;
    }
    
    const { brinquedosPessoa1, brinquedosPessoa2, animaisConsiderados } = validationResult.data;

    const adocoes = {};
    const animaisAdotados = { 1: [], 2: [] };

    for (const nomeAnimal of animaisConsiderados) {
      const animal = this.animais[nomeAnimal];
      
      const p1PodeAdotar = animaisAdotados[1].length < 3;
      const p2PodeAdotar = animaisAdotados[2].length < 3;

      const p1TemGato = animaisAdotados[1].some(a => this.animais[a].especie === 'gato');
      const p2TemGato = animaisAdotados[2].some(a => this.animais[a].especie === 'gato');

      const matchP1 = p1PodeAdotar && this.matchmaker.isMatch(animal, nomeAnimal, brinquedosPessoa1, animaisAdotados[1].length, p1TemGato);
      const matchP2 = p2PodeAdotar && this.matchmaker.isMatch(animal, nomeAnimal, brinquedosPessoa2, animaisAdotados[2].length, p2TemGato);

      if (matchP1 && !matchP2) {
        adocoes[nomeAnimal] = 'pessoa 1';
        animaisAdotados[1].push(nomeAnimal);
      } else if (!matchP1 && matchP2) {
        adocoes[nomeAnimal] = 'pessoa 2';
        animaisAdotados[2].push(nomeAnimal);
      } else {
        adocoes[nomeAnimal] = 'abrigo';
      }
    }
    
    return this.formatarResultado(adocoes);
  }

  formatarResultado(adocoes) {
    const listaFinal = Object.keys(adocoes)
      .map(nome => `${nome} - ${adocoes[nome]}`)
      .sort();
    
    return { lista: listaFinal };
  }
}

export { AbrigoAnimais as AbrigoAnimais };