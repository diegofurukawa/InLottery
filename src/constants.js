// Constantes globais da extensão

const DELAYS = {
  DEFAULT_GAME_DELAY: 600,    // Delay entre jogos (ms)
  RETRY_DELAY: 1000,          // Delay base para retry (ms)
  MAX_RETRIES: 3              // Número máximo de tentativas
};

const ERROR_MESSAGES = {
  NO_MODALITY: 'Por favor informe a modalidade',
  NO_GAMES: 'Preencha os jogos',
  NO_VALID_GAMES: 'Nenhum jogo válido encontrado',
  INVALID_FORMAT: 'Formato de jogo inválido',
  EXECUTION_ERROR: 'Erro ao executar script na página',
  TIMEOUT: 'Timeout ao processar jogo',
  NO_ACTIVE_TAB: 'Nenhuma aba ativa encontrada',
  CONFIG_NOT_FOUND: (modality) => `Configuração não encontrada para: ${modality}`,
  ELEMENT_NOT_FOUND: (selector) => `Elemento não encontrado: ${selector}`,
  NUMBER_OUT_OF_RANGE: (num, min, max) => `Número ${num} fora do range (${min}-${max})`,
  INSUFFICIENT_NUMBERS: (count, required) => `Mínimo de ${required} números necessários (fornecidos: ${count})`,
  TOO_MANY_NUMBERS: (count, max) => `Máximo de ${max} números permitidos (fornecidos: ${count})`
};

const SUCCESS_MESSAGES = {
  PROCESSING_COMPLETE: (count) => `Processamento concluído! ${count} jogos preenchidos.`,
  PROCESSING_CANCELLED: 'Processamento cancelado pelo usuário'
};

// Exporta constantes para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DELAYS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
  };
}
