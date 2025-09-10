class AbrigoAnimais{

  constructor() {
    this.animaisDisponiveis = {
      Rex: { tipo: 'cao', brinquedos: ['RATO', 'BOLA']},
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER']},
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER']},
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA']},
      Bola: { tipo: 'cao', brinquedos: ['CAIXA', 'NOVELO']},
      Bebe: { tipo: 'cao', brinquedos: ['LASER', 'RATO', 'BOLA']},
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO']}
    };  

    this.brinquedosDisponiveis = new Set([
      'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
    ]);
  }
  

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = this.separarPorVirgula(brinquedosPessoa1); 
    const brinquedos2 = this.separarPorVirgula(brinquedosPessoa2);
    const animais = this.separarPorVirgula(ordemAnimais);


    if (!this.validarAnimais(animais)) {
      return { erro: 'Animal inválido'};
    }

    if (!this.validarBrinquedos(brinquedos1) || !this.validarBrinquedos(brinquedos2)) {
      return { erro: 'Brinquedo inválido'};
    }


    const adotadosPessoa1 = [];
    const adotadosPessoa2 = [];

    const resultado = [];


    for (const animal of animais) {
      const dadosAnimal = this.animaisDisponiveis[animal];
      const tipo = dadosAnimal.tipo;
      const brinquedosFavoritos = dadosAnimal.brinquedos;

      const podeAdotarPessoa1 = this.podeAdotar(animal, tipo, brinquedosFavoritos, brinquedos1, adotadosPessoa1)
      const podeAdotarPessoa2 = this.podeAdotar(animal, tipo, brinquedosFavoritos, brinquedos2, adotadosPessoa2)
      

      let dono = 'abrigo';

      if (podeAdotarPessoa1 && podeAdotarPessoa2) {
        if (tipo === 'gato') {
          dono = 'abrigo';
        } else {
          dono = 'abrigo';
        }
      } else if (podeAdotarPessoa1) {
        if (adotadosPessoa1.length < 3) {
          adotadosPessoa1.push(animal);
          dono = 'pessoa 1';
        } else {
          dono = 'abrigo';
        }
      } else if (podeAdotarPessoa2) {
        if (adotadosPessoa2.length < 3) {
          adotadosPessoa2.push(animal);
          dono = 'pessoa 2';
      } else {
        dono = 'abrigo';
      }
    }

    resultado.push({ animal, dono });
   }
  
   resultado.sort((a, b) => a.animal.localeCompare(b.animal));  

   const lista = resultado.map(r => `${r.animal} - ${r.dono}`);

   return {lista};
  }


  podeAdotar(animal, tipo, brinquedosFavoritos, brinquedosPessoa, adotadosPessoa) {
    if (animal === 'Loco') {
      if (adotadosPessoa.length === 0) return false;
      
      for (const b of brinquedosFavoritos) {
        if (!brinquedosPessoa.includes(b)) return false;
      }
      return true;
    }
    return this.subsequencia(brinquedosFavoritos, brinquedosPessoa)
  }
  

  validarAnimais(animais) {
    const validos = new Set();
    for (const animal of animais) {
      if (!this.animaisDisponiveis.hasOwnProperty(animal)) {
        return false;
      }
      if (validos.has(animal)) {
        return false;
      }
      validos.add(animal);
    }
    return true;
  }


  validarBrinquedos(brinquedos) {
    const validos = new Set();
    for (const brinquedo of brinquedos) {
      if (!this.brinquedosDisponiveis.has(brinquedo)) {
        return false;
      }
      if (validos.has(brinquedo)) {
        return false;
      }
      validos.add(brinquedo);
    }
    return true;
  }


  subsequencia(array1, array2) {
    let i = 0;
    let j = 0;

    while (i < array1.length && j < array2.length) {
      if (array1[i] === array2[j] ) {
        i++;
      }
      j++;
    }
    return i === array1.length;
  }


  separarPorVirgula(entrada) {
    if (!entrada) return[];
    return entrada
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
  }

}

export { AbrigoAnimais as AbrigoAnimais };
