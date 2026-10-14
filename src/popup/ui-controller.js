// Controlador de UI - Gerencia interface e estado de progresso
// Extrai lógica de UI do popup.js original

class UIController {
  constructor() {
    this.processing = false;
    this.cancelRequested = false;

    // Cacheia referências dos elementos DOM
    this.elements = {
      progressBar: document.getElementById('progressBar'),
      progressContainer: document.getElementById('progressContainer'),
      button: document.getElementById('mybutton'),
      closeButton: document.getElementById('closeButton'),
      modalidade: document.getElementById('modalidade'),
      quantidade: document.getElementById('quantidade'),
      qtdTeimosinha: document.getElementById('qtdTeimosinha'),
      espelho: document.getElementById('espelho'),
      espelhoContainer: document.getElementById('espelhoContainer'),
      listadejogos: document.getElementById('listadejogos')
    };
  }

  /**
   * Atualiza barra de progresso
   * @param {number} current - Número atual de jogos processados
   * @param {number} total - Total de jogos a processar
   */
  updateProgress(current, total) {
    const percentage = Math.round((current / total) * 100);
    this.elements.progressBar.style.width = percentage + '%';
    this.elements.progressBar.textContent = `${current}/${total} (${percentage}%)`;
  }

  /**
   * Ativa/desativa modo de processamento
   * @param {boolean} isProcessing - true para ativar, false para desativar
   */
  toggleProcessing(isProcessing) {
    this.processing = isProcessing;
    this.elements.progressContainer.style.display = isProcessing ? 'block' : 'none';

    // Desabilita/habilita controles durante processamento
    const controlElements = [
      'button',
      'modalidade',
      'quantidade',
      'qtdTeimosinha',
      'espelho',
      'listadejogos'
    ];

    controlElements.forEach(key => {
      if (this.elements[key]) {
        this.elements[key].disabled = isProcessing;
      }
    });
  }

  /**
   * Captura dados do formulário
   * @returns {Object} Dados do formulário
   */
  getFormData() {
    return {
      modalidade: this.elements.modalidade.value,
      jogos: this.elements.listadejogos.value,
      extraNumbers: parseInt(this.elements.quantidade.value, 10),
      teimosinha: parseInt(this.elements.qtdTeimosinha.value, 10),
      espelho: this.elements.espelho.checked
    };
  }

  /**
   * Restaura os dados previamente salvos no formulário.
   * @param {Object} data - Dados persistidos do formulário
   */
  setFormData(data) {
    if (!data || typeof data !== 'object') return;

    this.elements.modalidade.value = data.modalidade || '';
    this.elements.listadejogos.value = typeof data.jogos === 'string' ? data.jogos : '';
    this.elements.quantidade.value = String(data.extraNumbers ?? 0);
    this.elements.qtdTeimosinha.value = String(data.teimosinha ?? 0);

    this.updateEspelhoVisibility(this.elements.modalidade.value);
    this.elements.espelho.checked =
      this.elements.modalidade.value === 'Lotomania' && Boolean(data.espelho);
  }

  /**
   * Exibe mensagem de erro
   * @param {string} message - Mensagem de erro
   */
  showError(message) {
    alert(message);
  }

  /**
   * Exibe mensagem de sucesso
   * @param {number} count - Quantidade de jogos processados
   */
  showSuccess(count) {
    alert(`Processamento concluído! ${count} jogos preenchidos.`);
  }

  /**
   * Exibe mensagem de cancelamento
   */
  showCancelled() {
    alert('Processamento cancelado pelo usuário');
  }

  /**
   * Solicita cancelamento do processamento
   */
  requestCancel() {
    this.cancelRequested = true;
  }

  /**
   * Reseta estado de cancelamento
   */
  resetCancelState() {
    this.cancelRequested = false;
  }

  /**
   * Verifica se cancelamento foi solicitado
   * @returns {boolean} true se cancelado
   */
  isCancelled() {
    return this.cancelRequested;
  }

  /**
   * Atualiza visibilidade do checkbox de espelho baseado na modalidade
   * @param {string} modalidade - ID da modalidade selecionada
   */
  updateEspelhoVisibility(modalidade) {
    if (this.elements.espelhoContainer) {
      // Mostra apenas para Lotomania
      const shouldShow = modalidade === 'Lotomania';
      this.elements.espelhoContainer.style.display = shouldShow ? 'block' : 'none';

      // Limpa o checkbox quando esconder
      if (!shouldShow && this.elements.espelho) {
        this.elements.espelho.checked = false;
      }
    }
  }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UIController };
}
