// Popup principal - Orquestrador refatorado
// Reduzido de 333 para ~150 linhas eliminando duplicação e modularizando

// Import de módulos (será bundled pelo webpack)
const { LOTTERY_CONFIG } = require('../core/lottery-config.js');
const { GameParser } = require('../core/game-parser.js');
const { DELAYS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../constants.js');
const { RetryHandler } = require('../utils/retry-handler.js');
const { UIController } = require('./ui-controller.js');

/**
 * Classe principal da extensão
 */
class LotteryExtension {
  constructor() {
    this.ui = new UIController();
    this.retryHandler = new RetryHandler(DELAYS.MAX_RETRIES, DELAYS.RETRY_DELAY);
    this.setupEventListeners();
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Mudança de modalidade (ÚNICO listener - elimina duplicação das linhas 229 e 317)
    this.ui.elements.modalidade.addEventListener('change', (e) => {
      this.handleModalityChange(e.target.value);
    });

    // Botão de processamento principal
    this.ui.elements.button.addEventListener('click', () => {
      this.processGames();
    });
  }

  /**
   * Handler para mudança de modalidade
   * @param {string} modalidade - ID da modalidade selecionada
   */
  async handleModalityChange(modalidade) {
    // Atualiza visibilidade do checkbox de espelho
    this.ui.updateEspelhoVisibility(modalidade);

    if (!modalidade) return;

    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length === 0) return;

      // Envia mensagem ao background para trocar modalidade na página
      await chrome.runtime.sendMessage({
        action: 'executar_script',
        tabId: tabs[0].id,
        value: modalidade
      });
    } catch (error) {
      console.error('Erro ao trocar modalidade:', error);
    }
  }

  /**
   * Processa todos os jogos (orquestração principal)
   */
  async processGames() {
    // Previne processamento duplicado
    if (this.ui.processing) return;

    // Captura dados do formulário
    const formData = this.ui.getFormData();

    // Validação de entrada
    if (!formData.modalidade) {
      this.ui.showError(ERROR_MESSAGES.NO_MODALITY);
      return;
    }

    if (!formData.jogos || !formData.jogos.trim()) {
      this.ui.showError(ERROR_MESSAGES.NO_GAMES);
      return;
    }

    // Parse de linhas
    const lines = formData.jogos.split('\n').filter(line => line.trim());
    if (lines.length === 0) {
      this.ui.showError(ERROR_MESSAGES.NO_VALID_GAMES);
      return;
    }

    // Configuração da modalidade
    const config = LOTTERY_CONFIG[formData.modalidade];
    if (!config) {
      this.ui.showError(ERROR_MESSAGES.CONFIG_NOT_FOUND(formData.modalidade));
      return;
    }

    // Inicia processamento
    this.ui.toggleProcessing(true);
    this.ui.updateProgress(0, lines.length);
    this.ui.resetCancelState();

    try {
      await this.processAllGames(lines, config, formData);

      if (this.ui.isCancelled()) {
        this.ui.showCancelled();
      } else {
        this.ui.showSuccess(lines.length);
      }
    } catch (error) {
      console.error('Erro durante processamento:', error);
      this.ui.showError(`Erro: ${error.message}`);
    } finally {
      this.ui.toggleProcessing(false);
    }
  }

  /**
   * Processa lista de jogos
   * @param {Array<string>} lines - Linhas de jogos
   * @param {Object} config - Configuração da modalidade
   * @param {Object} options - Opções (teimosinha, espelho, etc)
   */
  async processAllGames(lines, config, options) {
    const parser = GameParser.createParser(config.id, LOTTERY_CONFIG);

    for (let i = 0; i < lines.length; i++) {
      if (this.ui.isCancelled()) break;

      // Parse e validação do jogo
      let tokens;
      try {
        tokens = parser.parse(lines[i]);
        parser.validate(tokens);
      } catch (error) {
        console.warn(`Jogo ${i + 1} inválido:`, error.message);
        // Continua para próximo jogo (não falha completamente)
        continue;
      }

      // Executa jogo com retry automático
      try {
        await this.retryHandler.execute(
          () => this.executeGame(tokens, config, options),
          `Jogo ${i + 1}`
        );
      } catch (error) {
        console.error(`Falha ao processar jogo ${i + 1}:`, error.message);
        // Opcionalmente pode parar ou continuar
        // Por ora, continua processando
      }

      // Delay entre jogos
      await this.delay(DELAYS.DEFAULT_GAME_DELAY);
      this.ui.updateProgress(i + 1, lines.length);
    }
  }

  /**
   * Executa um jogo individual na página
   * @param {Object} tokens - Tokens parseados
   * @param {Object} config - Configuração da modalidade
   * @param {Object} options - Opções extras
   * @returns {Promise} Resultado da execução
   */
  async executeGame(tokens, config, options) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length === 0) {
      throw new Error(ERROR_MESSAGES.NO_ACTIVE_TAB);
    }

    // Serializa config removendo funções (selector de timemania)
    const cleanConfig = JSON.parse(JSON.stringify(config));

    // Injeta função diretamente (SEM EVAL - compatível com CSP do site da Caixa)
    // IMPORTANTE: Usar apenas vanilla JS (sem for...of) para evitar transpilação do Babel
    const result = await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      world: 'MAIN',
      func: function(tokens, config, options) {
        // Função auxiliar para clicar
        function clickElement(selector) {
          var el = document.querySelector(selector);
          if (!el) throw new Error('Elemento não encontrado: ' + selector);
          el.click();
          return true;
        }

        // Loteca tem lógica diferente
        if (config.parser === 'loteca') {
          clickElement(config.selectors.clearButton);
          var links = document.querySelectorAll(config.selectors.palpiteLinks);
          var map = {'1': 0, 'X': 1, '2': 2};
          for (var idx = 0; idx < tokens.choices.length; idx++) {
            var choice = tokens.choices[idx];
            links[idx * 3 + map[choice]].click();
          }
          clickElement(config.selectors.addToCartButton);
        } else {
          // Lógica padrão
          clickElement(config.selectors.clearButton);

          if (config.allowEspelho && options.espelho && config.selectors.espelhoCheckbox) {
            clickElement(config.selectors.espelhoCheckbox);
          }

          if (config.allowExtraNumbers && options.extraNumbers > 0) {
            for (var i = 0; i < options.extraNumbers; i++) {
              clickElement(config.selectors.increaseButton);
            }
          }

          if (config.allowTeimosinha && options.teimosinha > 0) {
            for (var j = 0; j < options.teimosinha; j++) {
              clickElement(config.selectors.teimosinhaButton);
            }
          }

          // Marca números (USAR FOR tradicional, não for...of)
          for (var k = 0; k < tokens.numbers.length; k++) {
            var num = tokens.numbers[k];
            var paddedNum = num.padStart(2, '0');
            clickElement(config.selectors.numberPrefix + paddedNum);
          }

          if (config.specialTokens) {
            if (config.specialTokens.type === 'teams' && tokens.teamNumber) {
              var teamIdx = (tokens.teamNumber * 2) - 1;
              clickElement('#carrossel_timemania > :first-child > :nth-child(' + teamIdx + ') > :first-child');
            } else if (config.specialTokens.type === 'months') {
              for (var m = 0; m < tokens.specialTokens.length; m++) {
                var tok = tokens.specialTokens[m];
                if (config.specialTokens.tokens[tok]) {
                  clickElement(config.specialTokens.tokens[tok]);
                }
              }
            } else if (config.specialTokens.type === 'trevos') {
              if (tokens.trevoCount > 2) {
                for (var p = 2; p < tokens.trevoCount; p++) {
                  clickElement(config.selectors.trevoIncreaseButton);
                }
              }
              for (var q = 0; q < tokens.trevos.length; q++) {
                var trevo = tokens.trevos[q];
                if (config.specialTokens.tokens[trevo]) {
                  clickElement(config.specialTokens.tokens[trevo]);
                }
              }
            }
          }

          clickElement(config.selectors.addToCartButton);
        }
        return true;
      },
      args: [tokens, cleanConfig, options]
    });

    if (!result || !result[0]?.result) {
      throw new Error(ERROR_MESSAGES.EXECUTION_ERROR);
    }

    return result[0].result;
  }

  /**
   * REMOVIDO: Função antiga que causava erro de minificação
   * Substituída por geração de código inline em executeGame()
   */
  _oldInjectGameExecution_REMOVED(tokens, config, options) {
    // IMPORTANTE: Esta função executa NO CONTEXTO DA PÁGINA, não da extensão

    // Alert para confirmar que função foi injetada
    alert('InLottery INJETADO! Config: ' + config.id + ', Números: ' + tokens.numbers.join(' '));

    // Função auxiliar para clicar em elemento
    function clickElement(selector) {
      const element = document.querySelector(selector);
      if (!element) {
        alert('ERRO: Elemento não encontrado: ' + selector);
        throw new Error(`Elemento não encontrado: ${selector}`);
      }
      element.click();
      return true;
    }

    // Executa jogo baseado no tipo
    if (config.parser === 'loteca') {
      // Loteca: lógica especial
      clickElement(config.selectors.clearButton);

      const links = document.querySelectorAll(config.selectors.palpiteLinks);
      tokens.choices.forEach((choice, gameIndex) => {
        const choiceIndex = { '1': 0, 'X': 1, '2': 2 }[choice];
        const linkIndex = gameIndex * 3 + choiceIndex;
        links[linkIndex].click();
      });

      clickElement(config.selectors.addToCartButton);
    } else {
      // Lógica padrão
      clickElement(config.selectors.clearButton);

      // Marca espelho (Lotomania)
      if (config.allowEspelho && options.espelho && config.selectors.espelhoCheckbox) {
        clickElement(config.selectors.espelhoCheckbox);
      }

      // Aumentar quantidade de números extras
      if (config.allowExtraNumbers && options.extraNumbers > 0 && config.selectors.increaseButton) {
        for (let i = 0; i < options.extraNumbers; i++) {
          clickElement(config.selectors.increaseButton);
        }
      }

      // Aumentar Teimosinha
      if (config.allowTeimosinha && options.teimosinha > 0 && config.selectors.teimosinhaButton) {
        for (let i = 0; i < options.teimosinha; i++) {
          clickElement(config.selectors.teimosinhaButton);
        }
      }

      // Marca números
      for (const num of tokens.numbers) {
        const formattedNum = num.padStart(2, '0');
        clickElement(`${config.selectors.numberPrefix}${formattedNum}`);
      }

      // Marca tokens especiais (meses, times, trevos)
      if (config.specialTokens) {
        const { type, tokens: tokenMap, selector: selectorFunc } = config.specialTokens;

        if (type === 'months') {
          for (const token of tokens.specialTokens) {
            if (tokenMap[token]) {
              clickElement(tokenMap[token]);
            }
          }
        } else if (type === 'teams') {
          const selector = selectorFunc(tokens.teamNumber);
          clickElement(selector);
        } else if (type === 'trevos') {
          // Aumentar quantidade de trevos
          if (tokens.trevoCount > 2 && config.selectors.trevoIncreaseButton) {
            for (let i = 2; i < tokens.trevoCount; i++) {
              clickElement(config.selectors.trevoIncreaseButton);
            }
          }
          // Marcar trevos
          for (const token of tokens.trevos) {
            if (tokenMap[token]) {
              clickElement(tokenMap[token]);
            }
          }
        }
      }

      clickElement(config.selectors.addToCartButton);
    }

    return true;
  }

  /**
   * Delay não-bloqueante
   * @param {number} ms - Milissegundos
   * @returns {Promise} Promise que resolve após delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Inicializa extensão quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new LotteryExtension();
});
