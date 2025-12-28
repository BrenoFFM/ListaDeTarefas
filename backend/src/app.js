// ============================================
// IMPORTAÇÕES
// ============================================

// Importa o framework Express
const express = require('express');

// Importa o middleware CORS para permitir requisições do frontend
const cors = require('cors');

// Importa as rotas de tarefas
const taskRoutes = require('./routes/taskRoutes');

// ============================================
// CRIAÇÃO DA APLICAÇÃO EXPRESS
// ============================================

// Cria uma instância da aplicação Express
const app = express();

// ============================================
// MIDDLEWARES
// ============================================

/**
 * Middleware CORS (Cross-Origin Resource Sharing)
 * Permite que o frontend (rodando em origem diferente) faça requisições à API
 * Sem isso, o navegador bloquearia as requisições por política de segurança
 */
app.use(cors());

/**
 * Middleware para parsing de JSON
 * Permite que o Express entenda requisições com corpo em formato JSON
 * Exemplo: { "title": "Minha tarefa" }
 */
app.use(express.json());

/**
 * Middleware para parsing de URL encoded
 * Permite que o Express entenda dados enviados via formulário HTML
 * (não é necessário para esta API, mas é uma boa prática)
 */
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROTAS
// ============================================

/**
 * Rota raiz da API
 * Retorna informações básicas sobre a API
 */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API REST - Lista de Tarefas',
        version: '1.0.0',
        endpoints: {
            'GET /tasks': 'Lista todas as tarefas',
            'GET /tasks/:id': 'Busca uma tarefa por ID',
            'POST /tasks': 'Cria uma nova tarefa',
            'PUT /tasks/:id': 'Atualiza uma tarefa',
            'DELETE /tasks/:id': 'Remove uma tarefa'
        }
    });
});

/**
 * Monta as rotas de tarefas no caminho /tasks
 * Todas as rotas definidas em taskRoutes.js estarão disponíveis em /tasks
 * Exemplos:
 *   - GET /tasks → listTasks()
 *   - POST /tasks → createTaskController()
 *   - PUT /tasks/1 → updateTaskController()
 *   - DELETE /tasks/1 → deleteTaskController()
 */
app.use('/tasks', taskRoutes);

// ============================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ============================================

/**
 * Middleware para tratar rotas não encontradas (404)
 * Este middleware é executado quando nenhuma rota anterior corresponde
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
    });
});

/**
 * Middleware global de tratamento de erros
 * Captura erros não tratados em qualquer rota
 */
app.use((err, req, res, next) => {
    // Log do erro no console (em produção, usar um logger adequado)
    console.error('Erro não tratado:', err);
    
    // Retorna resposta de erro genérico
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Erro desconhecido'
    });
});

// ============================================
// EXPORTAÇÃO DA APLICAÇÃO
// ============================================

// Exporta a aplicação Express para ser usada no server.js
module.exports = app;

/* 
EXPLICAÇÃO DO ARQUIVO app.js:

Este arquivo configura e inicializa a aplicação Express.

1. Responsabilidades:
   - Configurar middlewares do Express
   - Montar rotas da aplicação
   - Tratar erros globais
   - Configurar parsing de dados

2. Middlewares configurados:
   - express.json(): Permite receber JSON no body das requisições
   - express.urlencoded(): Permite receber dados de formulários
   - Middleware 404: Trata rotas não encontradas
   - Middleware de erro: Trata erros não capturados

3. Estrutura de rotas:
   - GET /: Rota raiz com informações da API
   - /tasks: Todas as rotas relacionadas a tarefas
   - Middleware 404: Captura qualquer rota não definida

4. Fluxo de requisição:
   a) Requisição chega ao servidor
   b) Middlewares de parsing processam o body
   c) Express tenta encontrar rota correspondente
   d) Se encontrar: executa controller da rota
   e) Se não encontrar: middleware 404 retorna erro
   f) Se houver erro: middleware de erro captura

5. Boas práticas implementadas:
   - Separação entre app.js (configuração) e server.js (inicialização)
   - Middleware de erro global
   - Rota raiz informativa
   - Código organizado e comentado

6. Próximos passos possíveis:
   - Adicionar CORS para permitir requisições do frontend
   - Adicionar autenticação/autorização
   - Adicionar logging mais robusto
   - Adicionar validação de dados com bibliotecas (ex: Joi, express-validator)

Este arquivo segue o padrão de separação de responsabilidades:
- app.js: Configuração da aplicação
- server.js: Inicialização do servidor
- routes/: Definição de rotas
- controllers/: Lógica de negócio
*/

