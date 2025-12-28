// ============================================
// IMPORTAÇÕES
// ============================================

// Importa as funções do service que acessa o banco de dados
const taskService = require('../services/taskService');

// ============================================
// CONTROLLER: Listar Todas as Tarefas
// ============================================

/**
 * Função que retorna todas as tarefas cadastradas
 * Rota: GET /tasks
 * 
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
async function listTasks(req, res) {
    try {
        // Busca todas as tarefas do banco de dados usando o service
        // await é necessário porque a função é assíncrona
        const tasks = await taskService.getAllTasks();
        
        // Retorna sucesso (200) com o array de tarefas
        // Status 200 = OK (requisição bem-sucedida)
        res.status(200).json({
            success: true,
            data: tasks,
            count: tasks.length
        });
    } catch (error) {
        // Se ocorrer algum erro inesperado, retorna erro 500
        // Status 500 = Internal Server Error (erro no servidor)
        res.status(500).json({
            success: false,
            message: 'Erro ao listar tarefas',
            error: error.message
        });
    }
}

// ============================================
// CONTROLLER: Buscar Tarefa por ID
// ============================================

/**
 * Função que retorna uma tarefa específica pelo ID
 * Rota: GET /tasks/:id
 * 
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
async function getTask(req, res) {
    try {
        // Extrai o ID da URL (parâmetro :id na rota)
        const taskId = req.params.id;
        
        // Busca a tarefa pelo ID no banco de dados usando o service
        const task = await taskService.getTaskById(taskId);
        
        // Verifica se a tarefa foi encontrada
        if (!task) {
            // Se não encontrou, retorna erro 404
            // Status 404 = Not Found (recurso não encontrado)
            return res.status(404).json({
                success: false,
                message: `Tarefa com ID ${taskId} não encontrada`
            });
        }
        
        // Se encontrou, retorna sucesso (200) com os dados da tarefa
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        // Se ocorrer algum erro inesperado, retorna erro 500
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar tarefa',
            error: error.message
        });
    }
}

// ============================================
// CONTROLLER: Criar Nova Tarefa
// ============================================

/**
 * Função que cria uma nova tarefa
 * Rota: POST /tasks
 * Body esperado: { "title": "Nome da tarefa" }
 * 
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
async function createTaskController(req, res) {
    try {
        // Extrai o título do corpo da requisição (body)
        const { title } = req.body;
        
        // Validação: verifica se o título foi fornecido
        if (!title) {
            // Se não foi fornecido, retorna erro 400
            // Status 400 = Bad Request (requisição inválida)
            return res.status(400).json({
                success: false,
                message: 'O campo "title" é obrigatório'
            });
        }
        
        // Validação: verifica se o título não está vazio após remover espaços
        if (typeof title !== 'string' || title.trim().length === 0) {
            // Se estiver vazio, retorna erro 400
            return res.status(400).json({
                success: false,
                message: 'O campo "title" não pode estar vazio'
            });
        }
        
        // Validação: verifica se o título não é muito longo
        if (title.length > 200) {
            // Se for muito longo, retorna erro 400
            return res.status(400).json({
                success: false,
                message: 'O campo "title" não pode ter mais de 200 caracteres'
            });
        }
        
        // Cria a nova tarefa no banco de dados usando o service
        const newTask = await taskService.createTask(title);
        
        // Retorna sucesso (201) com os dados da tarefa criada
        // Status 201 = Created (recurso criado com sucesso)
        res.status(201).json({
            success: true,
            message: 'Tarefa criada com sucesso',
            data: newTask
        });
    } catch (error) {
        // Se ocorrer algum erro inesperado, retorna erro 500
        res.status(500).json({
            success: false,
            message: 'Erro ao criar tarefa',
            error: error.message
        });
    }
}

// ============================================
// CONTROLLER: Atualizar Tarefa
// ============================================

/**
 * Função que atualiza uma tarefa existente
 * Rota: PUT /tasks/:id
 * Body esperado: { "title": "Novo título" } ou { "completed": true }
 * 
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
async function updateTaskController(req, res) {
    try {
        // Extrai o ID da URL (parâmetro :id na rota)
        const taskId = req.params.id;
        
        // Extrai os dados de atualização do corpo da requisição
        const { title, completed } = req.body;
        
        // Validação: verifica se pelo menos um campo foi fornecido
        if (title === undefined && completed === undefined) {
            // Se nenhum campo foi fornecido, retorna erro 400
            return res.status(400).json({
                success: false,
                message: 'É necessário fornecer pelo menos um campo para atualizar (title ou completed)'
            });
        }
        
        // Validação: se title foi fornecido, verifica se não está vazio
        if (title !== undefined) {
            if (typeof title !== 'string' || title.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'O campo "title" não pode estar vazio'
                });
            }
            
            if (title.length > 200) {
                return res.status(400).json({
                    success: false,
                    message: 'O campo "title" não pode ter mais de 200 caracteres'
                });
            }
        }
        
        // Validação: se completed foi fornecido, verifica se é booleano
        if (completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'O campo "completed" deve ser um valor booleano (true ou false)'
            });
        }
        
        // Prepara o objeto com as atualizações
        const updates = {};
        if (title !== undefined) updates.title = title;
        if (completed !== undefined) updates.completed = completed;
        
        // Atualiza a tarefa no banco de dados usando o service
        const updatedTask = await taskService.updateTask(taskId, updates);
        
        // Verifica se a tarefa foi encontrada
        if (!updatedTask) {
            // Se não encontrou, retorna erro 404
            return res.status(404).json({
                success: false,
                message: `Tarefa com ID ${taskId} não encontrada`
            });
        }
        
        // Se encontrou e atualizou, retorna sucesso (200) com os dados atualizados
        res.status(200).json({
            success: true,
            message: 'Tarefa atualizada com sucesso',
            data: updatedTask
        });
    } catch (error) {
        // Se ocorrer algum erro inesperado, retorna erro 500
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar tarefa',
            error: error.message
        });
    }
}

// ============================================
// CONTROLLER: Remover Tarefa
// ============================================

/**
 * Função que remove uma tarefa
 * Rota: DELETE /tasks/:id
 * 
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
async function deleteTaskController(req, res) {
    try {
        // Extrai o ID da URL (parâmetro :id na rota)
        const taskId = req.params.id;
        
        // Tenta remover a tarefa do banco de dados usando o service
        const deleted = await taskService.deleteTask(taskId);
        
        // Verifica se a tarefa foi encontrada e removida
        if (!deleted) {
            // Se não encontrou, retorna erro 404
            return res.status(404).json({
                success: false,
                message: `Tarefa com ID ${taskId} não encontrada`
            });
        }
        
        // Se encontrou e removeu, retorna sucesso (200)
        // Status 200 = OK (operação bem-sucedida)
        // Alternativamente, poderia usar 204 (No Content) para DELETE
        res.status(200).json({
            success: true,
            message: 'Tarefa removida com sucesso'
        });
    } catch (error) {
        // Se ocorrer algum erro inesperado, retorna erro 500
        res.status(500).json({
            success: false,
            message: 'Erro ao remover tarefa',
            error: error.message
        });
    }
}

// ============================================
// EXPORTAÇÃO DAS FUNÇÕES
// ============================================

// Exporta todas as funções do controller para serem usadas nas rotas
module.exports = {
    listTasks,
    getTask,
    createTaskController,
    updateTaskController,
    deleteTaskController
};

/* 
EXPLICAÇÃO DO ARQUIVO taskController.js:

Este arquivo contém toda a lógica de negócio e validações da API.

1. Responsabilidades:
   - Receber requisições HTTP
   - Validar dados de entrada
   - Chamar funções de acesso aos dados
   - Retornar respostas HTTP apropriadas

2. Funções CRUD:
   - listTasks(): Lista todas as tarefas (GET /tasks)
   - getTask(): Busca uma tarefa por ID (GET /tasks/:id)
   - createTaskController(): Cria nova tarefa (POST /tasks)
   - updateTaskController(): Atualiza tarefa (PUT /tasks/:id)
   - deleteTaskController(): Remove tarefa (DELETE /tasks/:id)

3. Validações implementadas:
   - Título obrigatório e não vazio
   - Título com limite de 200 caracteres
   - Completed deve ser booleano
   - Verificação de existência antes de atualizar/deletar

4. Códigos de status HTTP:
   - 200: Sucesso (OK)
   - 201: Criado com sucesso
   - 400: Requisição inválida (dados incorretos)
   - 404: Recurso não encontrado
   - 500: Erro interno do servidor

5. Estrutura de resposta:
   Todas as respostas seguem o padrão:
   {
     success: boolean,
     message: string (opcional),
     data: object/array (opcional),
     error: string (apenas em erros)
   }

6. Tratamento de erros:
   - Try/catch em todas as funções
   - Mensagens de erro claras e descritivas
   - Status HTTP apropriados para cada situação

Este controller segue o padrão de arquitetura em camadas:
- Routes: Definem as rotas HTTP
- Controllers: Validam dados e coordenam respostas (este arquivo)
- Services: Acessam o banco de dados (taskService.js)
- Prisma: ORM que traduz para SQL
- Database: PostgreSQL (persistência real)

Fluxo de uma requisição:
1. Cliente faz requisição HTTP → Routes
2. Routes direcionam → Controllers
3. Controllers validam dados → Services
4. Services acessam banco → Prisma
5. Prisma executa SQL → PostgreSQL
6. Resposta volta pelo mesmo caminho
*/

