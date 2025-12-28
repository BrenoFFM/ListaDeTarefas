// ============================================
// IMPORTAÇÕES
// ============================================

// Importa o Router do Express para criar rotas modulares
const express = require('express');

// Cria um novo router para agrupar as rotas relacionadas a tarefas
const router = express.Router();

// Importa todas as funções do controller de tarefas
const {
    listTasks,
    getTask,
    createTaskController,
    updateTaskController,
    deleteTaskController
} = require('../controllers/taskController');

// ============================================
// DEFINIÇÃO DAS ROTAS
// ============================================

/**
 * ROTA: GET /tasks
 * Descrição: Lista todas as tarefas cadastradas
 * Controller: listTasks
 */
router.get('/', listTasks);

/**
 * ROTA: GET /tasks/:id
 * Descrição: Busca uma tarefa específica pelo ID
 * Parâmetros:
 *   - :id (number) - ID da tarefa a ser buscada
 * Controller: getTask
 */
router.get('/:id', getTask);

/**
 * ROTA: POST /tasks
 * Descrição: Cria uma nova tarefa
 * Body esperado:
 *   {
 *     "title": "Nome da tarefa"
 *   }
 * Controller: createTaskController
 */
router.post('/', createTaskController);

/**
 * ROTA: PUT /tasks/:id
 * Descrição: Atualiza uma tarefa existente
 * Parâmetros:
 *   - :id (number) - ID da tarefa a ser atualizada
 * Body esperado:
 *   {
 *     "title": "Novo título" (opcional)
 *     "completed": true/false (opcional)
 *   }
 * Controller: updateTaskController
 */
router.put('/:id', updateTaskController);

/**
 * ROTA: DELETE /tasks/:id
 * Descrição: Remove uma tarefa
 * Parâmetros:
 *   - :id (number) - ID da tarefa a ser removida
 * Controller: deleteTaskController
 */
router.delete('/:id', deleteTaskController);

// ============================================
// EXPORTAÇÃO DO ROUTER
// ============================================

// Exporta o router para ser usado no app.js
module.exports = router;

/* 
EXPLICAÇÃO DO ARQUIVO taskRoutes.js:

Este arquivo define todas as rotas (endpoints) da API relacionadas a tarefas.

1. Estrutura:
   - Usa express.Router() para criar rotas modulares
   - Cada rota conecta uma URL + método HTTP a uma função do controller
   - Rotas são organizadas de forma clara e legível

2. Rotas implementadas:
   - GET    /tasks      → Lista todas as tarefas
   - GET    /tasks/:id  → Busca tarefa por ID
   - POST   /tasks      → Cria nova tarefa
   - PUT    /tasks/:id  → Atualiza tarefa existente
   - DELETE /tasks/:id  → Remove tarefa

3. Métodos HTTP:
   - GET:    Usado para buscar/ler dados
   - POST:   Usado para criar novos recursos
   - PUT:     Usado para atualizar recursos existentes
   - DELETE: Usado para remover recursos

4. Parâmetros de rota:
   - :id é um parâmetro dinâmico capturado da URL
   - Exemplo: GET /tasks/5 → req.params.id = "5"

5. Separação de responsabilidades:
   - Routes: Define QUAIS rotas existem
   - Controller: Define O QUE cada rota faz
   - Data: Define COMO os dados são armazenados

6. Vantagens desta estrutura:
   - Código organizado e fácil de manter
   - Fácil adicionar novas rotas
   - Fácil testar rotas individualmente
   - Separação clara entre rotas e lógica de negócio

Este arquivo será importado no app.js e montado em um caminho base
(por exemplo: /api/tasks), resultando em rotas finais como:
- GET    /api/tasks
- POST   /api/tasks
- PUT    /api/tasks/1
- DELETE /api/tasks/1
*/

