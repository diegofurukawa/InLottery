// Injetor DOM - Substitui modifyDOM e modifyDOMLoteca
// Elimina 87+ linhas de if/else hardcoded usando configuração declarativa

/**
 * Classe base para injeção DOM
 * Executa no contexto da página (via chrome.scripting.executeScript)
 */
class DOMInjector {
  constructor(config) {
    this.config = config;
  }

  /**
   * Clica em elemento usando seletor CSS
   * @param {string} selector - Seletor CSS do elemento
   * @throws {Error} Se elemento não for encontrado
   */
  clickElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Elemento não encontrado: ${selector}`);
    }
    element.click();
    return true;
  }

  /**
   * Limpa volante atual
   */
  clearGame() {
    this.clickElement(this.config.selectors.clearButton);
  }

  /**
   * Configura opções extras (quantidade, teimosinha, espelho)
   * @param {Object} options - Opções de configuração
   */
  setupOptions(options) {
    const { extraNumbers = 0, teimosinha = 0, espelho = false } = options;

    // Marcar espelho primeiro (Lotomania)
    if (this.config.allowEspelho && espelho && this.config.selectors.espelhoCheckbox) {
      this.clickElement(this.config.selectors.espelhoCheckbox);
    }

    // Aumentar quantidade de números extras
    if (this.config.allowExtraNumbers && extraNumbers > 0 && this.config.selectors.increaseButton) {
      for (let i = 0; i < extraNumbers; i++) {
        this.clickElement(this.config.selectors.increaseButton);
      }
    }

    // Aumentar Teimosinha (concursos consecutivos)
    if (this.config.allowTeimosinha && teimosinha > 0 && this.config.selectors.teimosinhaButton) {
      for (let i = 0; i < teimosinha; i++) {
        this.clickElement(this.config.selectors.teimosinhaButton);
      }
    }
  }

  /**
   * Marca números padrão
   * @param {Array<string>} numbers - Array de números a marcar
   */
  markNumbers(numbers) {
    for (const num of numbers) {
      // Garante formato com zero à esquerda (01, 02, etc)
      const formattedNum = num.padStart(2, '0');
      const selector = `${this.config.selectors.numberPrefix}${formattedNum}`;
      this.clickElement(selector);
    }
  }

  /**
   * Marca tokens especiais (meses, times, trevos)
   * @param {Object} tokens - Tokens parseados
   */
  markSpecialTokens(tokens) {
    if (!this.config.specialTokens) return;

    const { type, tokens: tokenMap, selector: selectorFunc } = this.config.specialTokens;

    switch (type) {
      case 'months':
        this.markMonths(tokens.specialTokens, tokenMap);
        break;
      case 'teams':
        this.markTeam(tokens.teamNumber);
        break;
      case 'trevos':
        this.markTrevos(tokens.trevos, tokenMap, tokens.trevoCount);
        break;
    }
  }

  /**
   * Marca meses (Dia de Sorte)
   * @param {Array<string>} monthTokens - Tokens de meses (JAN, FEV, etc)
   * @param {Object} tokenMap - Mapa de tokens para seletores
   */
  markMonths(monthTokens, tokenMap) {
    for (const token of monthTokens) {
      if (tokenMap[token]) {
        this.clickElement(tokenMap[token]);
      }
    }
  }

  /**
   * Marca time (Timemania)
   * @param {number} teamNumber - Número do time (1-80)
   */
  markTeam(teamNumber) {
    const selectorFunc = this.config.specialTokens.selector;
    const selector = selectorFunc(teamNumber);
    this.clickElement(selector);
  }

  /**
   * Marca trevos (+Milionária)
   * @param {Array<string>} trevoTokens - Tokens de trevos (T1-T6)
   * @param {Object} tokenMap - Mapa de tokens para seletores
   * @param {number} trevoCount - Quantidade de trevos
   */
  markTrevos(trevoTokens, tokenMap, trevoCount) {
    // Aumentar quantidade de trevos (padrão é 2, pode ir até 6)
    if (trevoCount > 2 && this.config.selectors.trevoIncreaseButton) {
      for (let i = 2; i < trevoCount; i++) {
        this.clickElement(this.config.selectors.trevoIncreaseButton);
      }
    }

    // Marcar cada trevo
    for (const token of trevoTokens) {
      if (tokenMap[token]) {
        this.clickElement(tokenMap[token]);
      }
    }
  }

  /**
   * Adiciona jogo ao carrinho
   */
  addToCart() {
    this.clickElement(this.config.selectors.addToCartButton);
  }

  /**
   * Executa jogo completo (orquestração principal)
   * @param {Object} tokens - Tokens parseados do jogo
   * @param {Object} options - Opções extras (teimosinha, espelho, etc)
   * @returns {boolean} true se sucesso
   */
  executeGame(tokens, options) {
    this.clearGame();
    this.setupOptions(options);
    this.markNumbers(tokens.numbers);
    this.markSpecialTokens(tokens);
    this.addToCart();
    return true;
  }
}

/**
 * Injetor específico para Loteca
 * Formato diferente: 14 apostas (coluna 1, meio, coluna 2)
 */
class LotecaInjector extends DOMInjector {
  /**
   * Executa jogo de Loteca
   * @param {Object} tokens - Tokens com choices (array de 14 caracteres: 1, X ou 2)
   * @returns {boolean} true se sucesso
   */
  executeGame(tokens) {
    this.clearGame();

    // Pega todos os links de palpite (3 por jogo x 14 jogos = 42 links)
    const links = document.querySelectorAll(this.config.selectors.palpiteLinks);

    if (links.length < 42) {
      throw new Error(`Esperados 42 links de palpite, encontrados ${links.length}`);
    }

    // Para cada jogo (14 total), marca o palpite correspondente
    tokens.choices.forEach((choice, gameIndex) => {
      // Mapeia escolha para índice (coluna 1=0, meio=1, coluna 2=2)
      const choiceIndex = { '1': 0, 'X': 1, '2': 2 }[choice];

      if (choiceIndex === undefined) {
        throw new Error(`Escolha inválida no jogo ${gameIndex + 1}: ${choice}`);
      }

      // Calcula índice do link (jogo * 3 + escolha)
      const linkIndex = gameIndex * 3 + choiceIndex;
      links[linkIndex].click();
    });

    this.addToCart();
    return true;
  }
}

/**
 * Factory para criar injetor apropriado baseado na configuração
 * @param {Object} config - Configuração da modalidade
 * @returns {DOMInjector} Injetor apropriado
 */
function createInjector(config) {
  if (config.parser === 'loteca') {
    return new LotecaInjector(config);
  }
  return new DOMInjector(config);
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DOMInjector,
    LotecaInjector,
    createInjector
  };
}

// Torna disponível globalmente para injeção via chrome.scripting.executeScript
if (typeof window !== 'undefined') {
  window.DOMInjector = DOMInjector;
  window.LotecaInjector = LotecaInjector;
  window.createInjector = createInjector;
}
