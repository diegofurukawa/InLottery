// Parsers para diferentes modalidades de loteria
// Substitui lógica manual de split e validação do código original

class GameParser {
  constructor(config) {
    this.config = config;
  }

  /**
   * Parse básico de linha de jogo em tokens
   * @param {string} line - Linha do jogo (ex: "01 02 03 04 05 06")
   * @returns {Object} Tokens parseados
   */
  parse(line) {
    const tokens = line.trim().split(/\s+/);
    return {
      numbers: tokens.filter(t => /^\d+$/.test(t)),
      specialTokens: tokens.filter(t => !/^\d+$/.test(t)),
      raw: line
    };
  }

  /**
   * Valida tokens parseados
   * @param {Object} tokens - Tokens para validar
   * @throws {Error} Se validação falhar
   */
  validate(tokens) {
    // Implementação básica - será sobrescrita em subclasses
    return true;
  }

  /**
   * Sanitiza token removendo caracteres perigosos (proteção XSS)
   * @param {string} token - Token para sanitizar
   * @returns {string} Token sanitizado
   */
  static sanitizeToken(token) {
    return String(token).replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * Factory para criar parser apropriado baseado na modalidade
   * @param {string} lotteryId - ID da modalidade
   * @param {Object} allConfigs - Objeto com todas as configurações
   * @returns {GameParser} Parser apropriado
   */
  static createParser(lotteryId, allConfigs) {
    const config = allConfigs[lotteryId];
    if (!config) {
      throw new Error(`Modalidade desconhecida: ${lotteryId}`);
    }

    switch (config.parser) {
      case 'loteca':
        return new LotecaParser(config);
      case 'timemania':
        return new TimeaniaParser(config);
      case 'maisMilionaria':
        return new MaisMilionariaParser(config);
      case 'standard':
      default:
        return new StandardParser(config);
    }
  }
}

/**
 * Parser padrão para modalidades standard
 * (Mega Sena, Quina, Lotofácil, Dupla Sena, Lotomania, etc)
 */
class StandardParser extends GameParser {
  validate(tokens) {
    const { numberRange, defaultSize, maxSize } = this.config;

    // Validar quantidade de números
    if (tokens.numbers.length < defaultSize) {
      throw new Error(`Mínimo de ${defaultSize} números necessários (fornecidos: ${tokens.numbers.length})`);
    }
    if (maxSize && tokens.numbers.length > maxSize) {
      throw new Error(`Máximo de ${maxSize} números permitidos (fornecidos: ${tokens.numbers.length})`);
    }

    // Validar range de números
    if (numberRange) {
      for (const numStr of tokens.numbers) {
        const num = parseInt(numStr, 10);
        if (num < numberRange.min || num > numberRange.max) {
          throw new Error(`Número ${num} fora do range (${numberRange.min}-${numberRange.max})`);
        }
      }
    }

    // Validar tokens especiais (meses, etc)
    if (this.config.specialTokens && tokens.specialTokens.length > 0) {
      this.validateSpecialTokens(tokens.specialTokens);
    }

    return true;
  }

  validateSpecialTokens(specialTokens) {
    const { specialTokens: config } = this.config;

    if (config.type === 'months') {
      const validMonths = Object.keys(config.tokens);
      for (const token of specialTokens) {
        if (!validMonths.includes(token)) {
          throw new Error(`Mês inválido: ${token}. Use: ${validMonths.join(', ')}`);
        }
      }
    }
  }
}

/**
 * Parser para Loteca
 * Formato esperado: "1XX 2 X 1..." ou "1XX2X1..." (14 caracteres 1, X ou 2)
 */
class LotecaParser extends GameParser {
  parse(line) {
    // Remove espaços e valida formato
    const cleaned = line.trim().replace(/\s+/g, '');

    if (!/^[1X2]{14}$/.test(cleaned)) {
      throw new Error('Formato inválido para Loteca. Use 14 caracteres: 1, X ou 2');
    }

    // Retorna array de apostas (14 elementos)
    return {
      choices: cleaned.split(''),
      raw: line
    };
  }

  validate(tokens) {
    // Validação já feita no parse
    return true;
  }
}

/**
 * Parser para Timemania
 * Formato: "01 02 03 04 05 06 07 08 09 10 TM42"
 */
class TimeaniaParser extends StandardParser {
  parse(line) {
    const tokens = super.parse(line);

    // Separar números de times
    const teamTokens = tokens.specialTokens.filter(t => t.startsWith('TM'));
    const otherTokens = tokens.specialTokens.filter(t => !t.startsWith('TM'));

    if (teamTokens.length !== 1) {
      throw new Error('Timemania requer exatamente 1 time (TM01-TM80)');
    }

    // Validar número do time
    const teamNum = parseInt(teamTokens[0].substring(2), 10);
    const { range } = this.config.specialTokens;
    if (teamNum < range.min || teamNum > range.max) {
      throw new Error(`Time inválido: ${teamTokens[0]}. Use TM01-TM${range.max}`);
    }

    return {
      ...tokens,
      team: teamTokens[0],
      teamNumber: teamNum,
      specialTokens: otherTokens
    };
  }
}

/**
 * Parser para +Milionária (com trevos)
 * Formato: "01 02 03 04 05 06 T1 T2"
 */
class MaisMilionariaParser extends StandardParser {
  parse(line) {
    const tokens = super.parse(line);

    // Separar números de trevos
    const trevoTokens = tokens.specialTokens.filter(t => t.startsWith('T') && /^T[1-6]$/.test(t));
    const otherTokens = tokens.specialTokens.filter(t => !(t.startsWith('T') && /^T[1-6]$/.test(t)));

    // +Milionária requer 2 trevos
    if (trevoTokens.length < 2) {
      throw new Error('+Milionária requer pelo menos 2 trevos (T1-T6)');
    }
    if (trevoTokens.length > 6) {
      throw new Error('+Milionária permite no máximo 6 trevos (T1-T6)');
    }

    // Validar que trevos são únicos
    const uniqueTrevos = new Set(trevoTokens);
    if (uniqueTrevos.size !== trevoTokens.length) {
      throw new Error('Trevos devem ser únicos');
    }

    return {
      ...tokens,
      trevos: trevoTokens,
      trevoCount: trevoTokens.length,
      specialTokens: otherTokens
    };
  }
}

// Exporta classes para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GameParser,
    StandardParser,
    LotecaParser,
    TimeaniaParser,
    MaisMilionariaParser
  };
}
