import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve resultar em empate e o animal deve ficar no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,NOVELO', 'CAIXA,NOVELO',
      'Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista.length).toBe(1);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para Loco independente da ordem dos brinquedos desde que tenha outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,CAIXA,BOLA,NOVELO,SKATE', 'LASER,RATO,BOLA',
      'Rex,Bola,Loco,Bebe');
      
      expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
      expect(resultado.lista[1]).toBe('Bola - pessoa 1');
      expect(resultado.lista[2]).toBe('Loco - pessoa 1');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve deixar o ultimo animal no abrigo pois a pessoa já atingiu o limite disponivel', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,RATO,BOLA,SKATE,CAIXA,NOVELO', 'BOLA,RATO,LASER',
      'Bebe,Zero,Loco,Bola,Fofo');
      
      expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
      expect(resultado.lista[1]).toBe('Bola - abrigo');
      expect(resultado.lista[2]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[3]).toBe('Loco - pessoa 1');
      expect(resultado.lista[4]).toBe('Zero - pessoa 1');
      expect(resultado.lista.length).toBe(5);
      expect(resultado.erro).toBeFalsy();
  });

});
