// Configuração declarativa de todas as modalidades de loteria
// Elimina 104+ if/else statements do código original

const LOTTERY_CONFIG = {
  'Mega-Sena': {
    id: 'Mega-Sena',
    numberRange: { min: 1, max: 60 },
    defaultSize: 6,
    maxSize: 15,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'Quina': {
    id: 'Quina',
    numberRange: { min: 1, max: 80 },
    defaultSize: 5,
    maxSize: 15,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'Lotofácil': {
    id: 'Lotofácil',
    numberRange: { min: 1, max: 25 },
    defaultSize: 15,
    maxSize: 18,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'Dupla-Sena': {
    id: 'Dupla-Sena',
    numberRange: { min: 1, max: 50 },
    defaultSize: 6,
    maxSize: 15,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'Lotomania': {
    id: 'Lotomania',
    numberRange: { min: 0, max: 99 },
    defaultSize: 50,
    maxSize: 50,
    allowTeimosinha: true,
    allowEspelho: true,
    allowExtraNumbers: false,
    selectors: {
      clearButton: '#limparvolante',
      teimosinhaButton: '#aumentarteimosinha',
      espelhoCheckbox: '#apostaEspelho',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'Super-Sete': {
    id: 'Super-Sete',
    numberRange: { min: 0, max: 9 },
    defaultSize: 7,
    maxSize: 21,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'Mais-Milionaria': {
    id: 'Mais-Milionaria',
    numberRange: { min: 1, max: 50 },
    defaultSize: 6,
    maxSize: 12,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n',
      trevoIncreaseButton: '#step6 > div:nth-child(2) > button:first-child'
    },
    specialTokens: {
      type: 'trevos',
      tokens: {
        'T1': '#trevo1',
        'T2': '#trevo2',
        'T3': '#trevo3',
        'T4': '#trevo4',
        'T5': '#trevo5',
        'T6': '#trevo6'
      }
    },
    parser: 'maisMilionaria'
  },

  'Timemania': {
    id: 'Timemania',
    numberRange: { min: 1, max: 80 },
    defaultSize: 10,
    maxSize: 10,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: false,
    selectors: {
      clearButton: '#limparvolante',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n',
      teamCarousel: '#carrossel_timemania'
    },
    specialTokens: {
      type: 'teams',
      prefix: 'TM',
      range: { min: 1, max: 80 },
      // Função para gerar seletor CSS robusto baseado no índice do time
      selector: (index) => {
        const childIndex = (index * 2) - 1;
        return `#carrossel_timemania > :first-child > :nth-child(${childIndex}) > :first-child`;
      }
    },
    parser: 'timemania'
  },

  'Dia-de-Sorte': {
    id: 'Dia-de-Sorte',
    numberRange: { min: 1, max: 31 },
    defaultSize: 7,
    maxSize: 15,
    allowTeimosinha: true,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      teimosinhaButton: '#aumentarteimosinha',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    specialTokens: {
      type: 'months',
      tokens: {
        'JAN': '#carrossel_diadesorte > :first-child > :nth-child(1)',
        'FEV': '#carrossel_diadesorte > :first-child > :nth-child(3)',
        'MAR': '#carrossel_diadesorte > :first-child > :nth-child(5)',
        'ABR': '#carrossel_diadesorte > :first-child > :nth-child(7)',
        'MAI': '#carrossel_diadesorte > :first-child > :nth-child(9)',
        'JUN': '#carrossel_diadesorte > :first-child > :nth-child(11)',
        'JUL': '#carrossel_diadesorte > :first-child > :nth-child(13)',
        'AGO': '#carrossel_diadesorte > :first-child > :nth-child(15)',
        'SET': '#carrossel_diadesorte > :first-child > :nth-child(17)',
        'OUT': '#carrossel_diadesorte > :first-child > :nth-child(19)',
        'NOV': '#carrossel_diadesorte > :first-child > :nth-child(21)',
        'DEZ': '#carrossel_diadesorte > :first-child > :nth-child(23)'
      }
    },
    parser: 'standard'
  },

  'Loteca': {
    id: 'Loteca',
    defaultSize: 14,
    maxSize: 14,
    allowTeimosinha: false,
    allowEspelho: false,
    allowExtraNumbers: false,
    selectors: {
      clearButton: '#limparvolante',
      addToCartButton: '#colocarnocarrinho',
      palpiteLinks: 'a.loteca_palpite'
    },
    parser: 'loteca',
    validation: {
      // Aceita "1XX 2 X 1..." ou "1XX2X1..." (com ou sem espaços)
      expectedFormat: /^[1X2\s]{14,}$/,
      errorMessage: 'Formato inválido para Loteca. Use 14 caracteres: 1, X ou 2 (coluna 1, meio ou coluna 2)'
    }
  },

  // Jogos especiais (datas comemorativas)
  'data-jogo-lotofacil-especial': {
    id: 'data-jogo-lotofacil-especial',
    numberRange: { min: 1, max: 25 },
    defaultSize: 15,
    maxSize: 18,
    allowTeimosinha: false,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'data-jogo-mega-sena-especial': {
    id: 'data-jogo-mega-sena-especial',
    numberRange: { min: 1, max: 60 },
    defaultSize: 6,
    maxSize: 15,
    allowTeimosinha: false,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  },

  'data-jogo-quina-especial': {
    id: 'data-jogo-quina-especial',
    numberRange: { min: 1, max: 80 },
    defaultSize: 5,
    maxSize: 15,
    allowTeimosinha: false,
    allowEspelho: false,
    allowExtraNumbers: true,
    selectors: {
      clearButton: '#limparvolante',
      increaseButton: '#aumentarnumero',
      addToCartButton: '#colocarnocarrinho',
      numberPrefix: '#n'
    },
    parser: 'standard'
  }
};

// Exporta configuração para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LOTTERY_CONFIG };
}
