// Handler de retry com backoff exponencial
// Substitui delay fixo de 600ms por sistema mais robusto

class RetryHandler {
  constructor(maxRetries = 3, baseDelay = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
  }

  /**
   * Executa função com retry automático em caso de falha
   * @param {Function} fn - Função async a executar
   * @param {string} context - Contexto para logging (ex: "Jogo 1")
   * @returns {Promise<any>} Resultado da função
   * @throws {Error} Se todas as tentativas falharem
   */
  async execute(fn, context = 'Operação') {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        console.warn(`${context} falhou (tentativa ${attempt}/${this.maxRetries}):`, error.message);

        // Se não é última tentativa, aguarda antes de tentar novamente
        if (attempt < this.maxRetries) {
          const delay = this.calculateBackoff(attempt);
          console.log(`Aguardando ${delay}ms antes de tentar novamente...`);
          await this.delay(delay);
        }
      }
    }

    // Todas as tentativas falharam
    throw new Error(`${context} falhou após ${this.maxRetries} tentativas: ${lastError.message}`);
  }

  /**
   * Calcula delay com backoff exponencial
   * Tentativa 1: baseDelay * 1 = 1000ms
   * Tentativa 2: baseDelay * 2 = 2000ms
   * Tentativa 3: baseDelay * 4 = 4000ms
   * @param {number} attempt - Número da tentativa atual
   * @returns {number} Delay em ms
   */
  calculateBackoff(attempt) {
    return this.baseDelay * Math.pow(2, attempt - 1);
  }

  /**
   * Delay não-bloqueante
   * @param {number} ms - Milissegundos para aguardar
   * @returns {Promise} Promise que resolve após o delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RetryHandler };
}
