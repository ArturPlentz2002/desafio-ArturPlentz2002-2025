import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  // Valida a checagem de animal inexistente, conforme o caso de erro do README.
  test('Deve rejeitar animal inválido', () => {
    const construtor = new AbrigoAnimais();
    const resultado = construtor.encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeUndefined();
  });

  // Teste de caso do readm
  test('Deve encontrar pessoa para um animal com match perfeito', () => {
    const construtor = new AbrigoAnimais();
    const resultado = construtor.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      
    expect(resultado.lista).toEqual(['Fofo - abrigo', 'Rex - pessoa 1']);
  });

  // Testa brinquedos que os bixos querem // mas é random e tem q dar certo
  test('Deve encontrar pessoa para um animal com match intercalado', () => {
    const construtor = new AbrigoAnimais();
    const resultado = construtor.encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );

    // Análise deste cenário:
    // Mimi: Empate (P1 perfeito, P2 intercalado) -> abrigo
    // Fofo: Apenas P2 tem match -> pessoa 2
    // Rex e Bola: Sem match -> abrigo
    const saidaEsperada = ['Bola - abrigo', 'Fofo - pessoa 2', 'Mimi - abrigo', 'Rex - abrigo'];
    
    expect(resultado.lista.sort()).toEqual(saidaEsperada.sort());
  });

  // Testes feito de maneiras diferentes para tentar chegar em todos os casos.
  describe('Validação de Regras de Negócio Adicionais', () => {

    test('REGRA: Deve retornar erro se a pessoa listar um brinquedo duplicado', () => {
      const construtor = new AbrigoAnimais();
      const resultado = construtor.encontraPessoas('RATO,BOLA,RATO', '', 'Rex');
      expect(resultado.erro).toBe('Brinquedo inválido');
    });

    test('REGRA 5: Uma pessoa não pode adotar mais de três animais', () => {
      const construtor = new AbrigoAnimais();
      const resultado = construtor.encontraPessoas('CAIXA,NOVELO,RATO,BOLA,LASER', '', 'Bola,Rex,Zero,Bebe');

      const adocoesPessoa1 = resultado.lista.filter(r => r.endsWith('pessoa 1'));
      expect(adocoesPessoa1.length).toBe(3);
      expect(resultado.lista).toContain('Bebe - abrigo');
    });

    test('REGRA 3: Uma pessoa não pode adotar mais de um gato', () => {
      const construtor = new AbrigoAnimais();
      const resultado = construtor.encontraPessoas('BOLA,RATO,LASER', '', 'Fofo,Mimi');

      expect(resultado.lista).toContain('Fofo - pessoa 1');
      expect(resultado.lista).toContain('Mimi - abrigo');
    });
    
    // Test de brinquedo
    test('REGRA 6: Loco só é adotado se a pessoa já tiver um animal de companhia', () => {
      const construtor = new AbrigoAnimais();
      const brinquedosPessoa1 = 'RATO,BOLA,SKATE';

      const resultadoSemCompanhia = construtor.encontraPessoas(brinquedosPessoa1, '', 'Loco,Rex');
      expect(resultadoSemCompanhia.lista).toContain('Loco - abrigo');
      
      const resultadoComCompanhia = construtor.encontraPessoas(brinquedosPessoa1, '', 'Rex,Loco');
      expect(resultadoComCompanhia.lista).toContain('Rex - pessoa 1');
      expect(resultadoComCompanhia.lista).toContain('Loco - pessoa 1');
    });

    test('REGRA 4: Em caso de empate, o animal fica no abrigo', () => {
      const construtor = new AbrigoAnimais();
      const brinquedosIguais = 'RATO,BOLA';
      
      const resultado = construtor.encontraPessoas(brinquedosIguais, brinquedosIguais, 'Rex');

      expect(resultado.lista).toEqual(['Rex - abrigo']);
    });
  });
});