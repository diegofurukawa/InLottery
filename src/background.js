// Background script (Service Worker para Manifest V3)
// Gerencia comunicação entre popup e content scripts

/**
 * Função injetada na página para clicar na modalidade selecionada
 * @param {string} modalidade - ID da modalidade (ex: "Mega-Sena", "Timemania")
 */
function clickModalidade(modalidade) {
  try {
    const menuLink = document.querySelector("#menuPrincipal a#" + modalidade);
    if (!menuLink) {
      throw new Error(`Modalidade não encontrada no menu: ${modalidade}`);
    }
    menuLink.click();
  } catch (error) {
    console.error('Erro ao clicar na modalidade:', error);
    throw error;
  }
}

/**
 * Listener de mensagens do popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "executar_script") {
    // Executa script para trocar modalidade na página
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      function: clickModalidade,
      args: [message.value]
    })
    .then(() => {
      console.log(`Modalidade alterada para: ${message.value}`);
    })
    .catch((error) => {
      console.error("Erro ao executar script:", error);
    });

    // Retorna true para indicar resposta assíncrona
    return true;
  }
});
