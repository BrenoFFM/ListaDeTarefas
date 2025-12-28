// ============================================
// IMPORTAÇÕES
// ============================================

// Importa a aplicação Express configurada
const app = require('./app');

// ============================================
// CONFIGURAÇÃO DA PORTA
// ============================================

/**
 * Define a porta em que o servidor irá escutar
 * Usa a variável de ambiente PORT se disponível, caso contrário usa 3000
 * Isso permite configurar a porta via variável de ambiente (útil em produção)
 */
const PORT = process.env.PORT || 3000;

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================

/**
 * Inicia o servidor HTTP na porta especificada
 * O servidor fica "escutando" requisições HTTP
 */
app.listen(PORT, () => {
    // Mensagem exibida quando o servidor inicia com sucesso
    console.log('===========================================');
    console.log('🚀 Servidor iniciado com sucesso!');
    console.log('===========================================');
    console.log(`📡 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`📋 API disponível em: http://localhost:${PORT}/tasks`);
    console.log(`📖 Documentação: http://localhost:${PORT}/`);
    console.log('===========================================');
    console.log('Pressione Ctrl+C para encerrar o servidor');
    console.log('===========================================');
});

// ============================================
// TRATAMENTO DE ERROS DE INICIALIZAÇÃO
// ============================================

/**
 * Trata erros que podem ocorrer ao iniciar o servidor
 * Exemplo: porta já em uso
 */
process.on('error', (error) => {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1); // Encerra o processo com código de erro
});

/**
 * Trata o sinal SIGTERM (usado para encerrar o servidor graciosamente)
 * Útil em ambientes de produção
 */
process.on('SIGTERM', () => {
    console.log('⚠️  Recebido sinal SIGTERM. Encerrando servidor...');
    process.exit(0); // Encerra o processo com sucesso
});

/**
 * Trata o sinal SIGINT (Ctrl+C)
 * Permite encerrar o servidor de forma controlada
 */
process.on('SIGINT', () => {
    console.log('\n⚠️  Recebido sinal SIGINT. Encerrando servidor...');
    process.exit(0); // Encerra o processo com sucesso
});

/* 
EXPLICAÇÃO DO ARQUIVO server.js:

Este arquivo é responsável por iniciar o servidor HTTP.

1. Responsabilidades:
   - Importar a aplicação Express configurada
   - Definir a porta do servidor
   - Iniciar o servidor HTTP
   - Tratar erros e sinais do sistema

2. Fluxo de inicialização:
   a) Importa app.js (aplicação Express configurada)
   b) Define a porta (3000 padrão ou variável de ambiente)
   c) Inicia o servidor com app.listen()
   d) Exibe mensagens informativas no console

3. Configuração de porta:
   - Usa process.env.PORT se disponível (útil em produção)
   - Fallback para porta 3000 se não definida
   - Permite flexibilidade em diferentes ambientes

4. Tratamento de sinais:
   - SIGTERM: Sinal de término (usado por gerenciadores de processo)
   - SIGINT: Interrupção (Ctrl+C no terminal)
   - Permite encerramento gracioso do servidor

5. Separação de responsabilidades:
   - app.js: Configuração da aplicação
   - server.js: Inicialização do servidor
   - Esta separação facilita testes e manutenção

6. Mensagens informativas:
   - Exibe URL do servidor
   - Exibe endpoints disponíveis
   - Facilita debugging e desenvolvimento

7. Boas práticas:
   - Usa variáveis de ambiente para configuração
   - Trata erros de inicialização
   - Permite encerramento gracioso
   - Mensagens claras no console

Para iniciar o servidor, execute:
  npm start

Ou diretamente:
  node src/server.js

O servidor ficará disponível em http://localhost:3000
*/

