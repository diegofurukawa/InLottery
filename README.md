# 🎰 InLottery

**Extensão inteligente para preenchimento automático de jogos nas Loterias Caixa Online**

Economize tempo e evite erros ao preencher seus jogos favoritos! O InLottery preenche automaticamente seus bilhetes no site oficial das Loterias Caixa, permitindo que você aposte de forma rápida, precisa e eficiente.

<div align="center">

[![Version](https://img.shields.io/badge/version-3.0.1-green.svg)](manifest.json)
[![Manifest](https://img.shields.io/badge/manifest-v3-blue.svg)](manifest.json)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

</div>

---

## ✨ Funcionalidades Principais

### 🎯 Preenchimento Automático Inteligente
- **Cole e preencha**: Copie seus jogos de qualquer planilha ou arquivo de texto e deixe a extensão fazer o trabalho pesado
- **Processamento em lote**: Preencha dezenas ou até centenas de jogos de uma só vez
- **Validação automática**: A extensão verifica se seus números estão no formato correto antes de enviar

### 🎲 Suporte Completo para Todas as Modalidades

| Modalidade | Números | Recursos Especiais |
|------------|---------|-------------------|
| 🎱 **Mega Sena** | 6 a 15 números (1-60) | Números extras, Teimosinha |
| 🎊 **Mega da Virada** | 6 a 15 números (1-60) | Números extras |
| 5️⃣ **Quina** | 5 a 15 números (1-80) | Números extras, Teimosinha |
| 🎉 **Quina de São João** | 5 a 15 números (1-80) | Números extras |
| 🍀 **Lotofácil** | 15 a 18 números (1-25) | Números extras, Teimosinha |
| 🇧🇷 **Lotofácil da Independência** | 15 a 18 números (1-25) | Números extras |
| 🔢 **Lotomania** | Sempre 50 números (0-99) | Espelho, Teimosinha |
| ⚽ **Timemania** | 10 números (1-80) + Time | Seleção de time do coração |
| 2️⃣ **Dupla Sena** | 6 a 15 números (1-50) | Números extras, Teimosinha |
| 📅 **Dia de Sorte** | 7 a 15 números (1-31) + Mês | Seleção de mês da sorte |
| 7️⃣ **Super Sete** | 7 a 21 números (0-9) | Números extras, Teimosinha |
| 💰 **Mais Milionária** | 6 a 12 números (1-50) + Trevos | 2 a 6 trevos da sorte |
| ⚽ **Loteca** | 14 palpites (1, X ou 2) | Palpites de resultados |

### 🚀 Recursos Avançados

- **⚡ Teimosinha**: Configure automaticamente apostas para múltiplos concursos consecutivos (até 6 concursos)
- **🔄 Espelho**: Ative o recurso de espelho para Lotomania com um clique
- **➕ Números Extras**: Aumente suas chances adicionando até 9 números extras ao jogo simples
- **📊 Barra de Progresso**: Acompanhe em tempo real o preenchimento de múltiplos jogos
- **🛡️ Sistema de Retry**: Tentativas automáticas em caso de falha temporária
- **✅ Validação Inteligente**: Verifica formato, quantidade e intervalo de números antes de processar

### 🎮 Jogos com Recursos Especiais

#### Timemania ⚽
- Preencha seus 10 números favoritos
- Selecione seu time do coração usando o código `TM + número do time (1-80)`
- Exemplo: `05 10 15 20 25 30 35 40 45 50 TM12` (Corinthians)

#### Dia de Sorte 📅
- Escolha 7 a 15 números da sorte
- Selecione seu mês da sorte usando códigos: `JAN`, `FEV`, `MAR`, `ABR`, `MAI`, `JUN`, `JUL`, `AGO`, `SET`, `OUT`, `NOV`, `DEZ`
- Exemplo: `01 05 10 15 20 25 30 DEZ`

#### Mais Milionária 💰
- Escolha 6 a 12 números principais
- Selecione de 2 a 6 trevos da sorte usando `T1` a `T6`
- Exemplo: `01 05 10 15 20 25 T1 T3 T5`

#### Loteca ⚽
- Palpite os resultados de 14 jogos
- Use `1` (vitória coluna 1), `X` (empate) ou `2` (vitória coluna 2)
- Exemplo: `1 X 2 1 1 X 2 X 1 2 1 X 2 1`

---

## 📦 Instalação

### Método 1: Chrome Web Store (Recomendado)
> 🚧 Em breve disponível na Chrome Web Store

### Método 2: Instalação Manual (Desenvolvedor)

1. **Clone ou baixe este repositório**
   ```bash
   git clone https://github.com/diegofurukawa/InLottery.git
   cd InLottery
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Compile a extensão**
   ```bash
   npm run build
   ```

4. **Carregue no Chrome**
   - Abra `chrome://extensions/`
   - Ative o "Modo do desenvolvedor" (canto superior direito)
   - Clique em "Carregar sem compactação"
   - Selecione a pasta raiz do projeto (onde está o [manifest.json](manifest.json))

5. **Pronto!** O ícone do InLottery aparecerá na barra de ferramentas do Chrome

---

## 🎯 Como Usar

### Passo a Passo

1. **Acesse o site oficial**
   - Clique no botão "🌐 Abrir Loterias Caixa" na extensão
   - Ou acesse diretamente: [loteriasonline.caixa.gov.br](https://loteriasonline.caixa.gov.br)

2. **Faça login na sua conta**
   - Entre com suas credenciais da Caixa

3. **Prepare seus jogos**
   - Crie uma lista com seus jogos favoritos (um por linha)
   - Formate os números conforme a modalidade escolhida

4. **Use a extensão**
   - Clique no ícone do InLottery na barra de ferramentas
   - Selecione a modalidade desejada
   - Configure opções extras (Teimosinha, números extras, etc)
   - Cole seus jogos no campo de texto
   - Clique em "🎲 Preencher Jogos"

5. **Acompanhe o processo**
   - A barra de progresso mostrará o andamento
   - Seus jogos serão adicionados automaticamente ao carrinho

6. **Finalize no site**
   - Revise seus jogos no carrinho
   - Conclua o pagamento normalmente pelo site da Caixa

---

## 📝 Exemplos de Formato

### Mega Sena
```
01 05 10 15 20 25
03 07 12 18 23 30
11 14 22 33 44 55
```

### Lotofácil
```
01 02 03 04 05 06 07 08 09 10 11 12 13 14 15
02 03 04 05 06 07 08 09 10 11 12 13 14 15 16
```

### Lotomania (50 números)
```
00 05 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 01 02 03 04 06 07 08 09 11 12 13 14 16 17 18 19 21 22 23 24 26 27 28 29 31 32 33 34 36 37 38 39
```

### Timemania (com time do coração)
```
05 10 15 20 25 30 35 40 45 50 TM12
08 13 22 29 37 41 52 60 68 75 TM01
```

### Dia de Sorte (com mês da sorte)
```
01 05 10 15 20 25 30 DEZ
03 07 12 18 23 28 31 JAN
```

### Mais Milionária (com trevos)
```
01 05 10 15 20 25 T1 T3
08 13 22 29 37 41 T2 T4 T6
```

### Loteca (14 palpites)
```
1 X 2 1 1 X 2 X 1 2 1 X 2 1
X X 1 2 1 X 2 1 X 1 2 X 1 2
```

---

## 🛠️ Tecnologias Utilizadas

- **Manifest V3**: Versão mais recente e segura das extensões Chrome
- **JavaScript ES6+**: Código moderno e eficiente
- **Webpack**: Bundling e otimização de código
- **Chrome Extension APIs**: Integração nativa com o navegador
- **Arquitetura Modular**: Código organizado e fácil de manter

---

## 🏗️ Arquitetura do Projeto

```
InLottery/
├── src/
│   ├── popup/
│   │   ├── popup.js              # Orquestrador principal
│   │   └── ui-controller.js      # Gerenciamento de UI
│   ├── core/
│   │   ├── lottery-config.js     # Configurações declarativas
│   │   ├── game-parser.js        # Parser e validação
│   │   └── dom-injector.js       # Injeção DOM
│   ├── utils/
│   │   └── retry-handler.js      # Retry com backoff
│   ├── background.js             # Service Worker
│   └── constants.js              # Constantes globais
├── dist/                         # Build output
├── popup.html                    # Interface da extensão
├── manifest.json                 # Manifest V3
├── webpack.config.js             # Configuração build
└── package.json                  # Dependências
```

### Principais Vantagens da Arquitetura

**Antes da refatoração v2.0**:
- 333 linhas em arquivo monolítico
- 104+ if/else statements hardcoded
- Código duplicado (~40%)
- Manifest V2 descontinuado

**Depois da refatoração v2.0**:
- Arquitetura modularizada (10 arquivos)
- Configuração declarativa (0 if/else)
- Código limpo e testável
- Manifest V3 compatível

---

## 🔒 Segurança e Privacidade

- ✅ **Código aberto**: Totalmente transparente e auditável
- ✅ **Sem coleta de dados**: Não armazenamos nem compartilhamos suas informações
- ✅ **Execução local**: Todo processamento acontece no seu navegador
- ✅ **Permissões mínimas**: Acessa apenas o site necessário (loteriasonline.caixa.gov.br)
- ✅ **Sem rastreamento**: Nenhum analytics ou telemetria
- ✅ **CSP Compliant**: Compatible com Content Security Policy do site da Caixa
- ⚠️ **Desenvolvido por terceiros**: Não é um produto oficial da Caixa Econômica Federal

---

## 💻 Desenvolvimento

### Build em modo watch (desenvolvimento)
```bash
npm run watch
```

### Build de produção
```bash
npm run build
```

### Como Adicionar Nova Modalidade

Adicionar uma nova modalidade é extremamente simples:

**Passo 1**: Adicione a configuração em [src/core/lottery-config.js](src/core/lottery-config.js)
```javascript
'Nova-Loteria': {
  id: 'Nova-Loteria',
  numberRange: { min: 1, max: 50 },
  defaultSize: 5,
  maxSize: 10,
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
}
```

**Passo 2**: Adicione a opção no HTML [popup.html](popup.html)
```html
<option value="Nova-Loteria">🎯 Nova Loteria</option>
```

**Passo 3**: Rebuild
```bash
npm run build
```

Pronto! ✅

---

## 🚀 Roadmap

### Próximas Features
- [ ] Importação de arquivos CSV/Excel
- [ ] Histórico de jogos preenchidos
- [ ] Templates de jogos salvos
- [ ] Suporte para desdobramentos matemáticos
- [ ] Gerador de jogos aleatórios
- [ ] Estatísticas e análises

### Futuro
- [ ] Suporte para Firefox
- [ ] Suporte para Edge
- [ ] Modo escuro
- [ ] Atalhos de teclado
- [ ] Sincronização na nuvem

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Se você encontrou um bug ou tem uma sugestão:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Guia de Contribuição

- Mantenha o código limpo e documentado
- Siga os padrões existentes de código
- Teste suas alterações antes de enviar
- Atualize a documentação se necessário

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## ⚠️ Avisos Importantes

- Esta extensão **NÃO** é desenvolvida, mantida ou endossada pela Caixa Econômica Federal
- Use por sua conta e risco
- Sempre revise seus jogos no carrinho antes de finalizar o pagamento
- A extensão apenas automatiza o preenchimento - você é responsável pelas apostas
- Jogue com responsabilidade
- É comum a Caixa modificar o site e ser necessário adequar os seletores DOM

### Se a extensão parar de funcionar:
1. Verifique os seletores em [src/core/lottery-config.js](src/core/lottery-config.js)
2. Use DevTools do Chrome para inspecionar a estrutura do site
3. Atualize os seletores conforme necessário
4. Faça rebuild (`npm run build`)

---

## 💬 Suporte

Encontrou algum problema ou tem alguma dúvida?

- 🐛 [Reportar um bug](https://github.com/diegofurukawa/InLottery/issues)
- 💡 [Sugerir uma funcionalidade](https://github.com/diegofurukawa/InLottery/issues)
- 📖 [Documentação completa](https://github.com/diegofurukawa/InLottery/wiki)

---

## 🌟 Mostre seu Apoio

Se esta extensão te ajudou, considere:

- ⭐ Dar uma estrela no GitHub
- 🐦 Compartilhar com seus amigos
- 💬 Deixar um feedback
- 🤝 Contribuir com código

---

## 👏 Créditos

### Autor Original
Guy Novaes - [YouTube](https://www.youtube.com/channel/UCIrI4qlfFQN6cUrTXoGAdZA)

### Refatoração v2.0 e v3.0
Refatoração completa implementada para melhorar manutenibilidade, extensibilidade e modernização.

---

<div align="center">

**Feito com ❤️ para os apostadores brasileiros**

[🎰 Começar a Usar](#-instalação) • [📖 Documentação](#-como-usar) • [🐛 Reportar Bug](https://github.com/diegofurukawa/InLottery/issues)

---

**InLottery** - Sua sorte começa aqui! 🍀

</div>
