// ============================================
// IMPORTAÇÕES
// ============================================

// Importa o cliente Prisma para acessar o banco de dados
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do Prisma Client
// Esta instância será reutilizada em todas as operações
const prisma = new PrismaClient();

// ============================================
// SERVICE: Criar Nova Tarefa
// ============================================

/**
 * Cria uma nova tarefa no banco de dados
 * 
 * @param {string} title - Título da tarefa a ser criada
 * @returns {Promise<Object>} A tarefa criada com todos os campos
 * @throws {Error} Se ocorrer erro ao criar no banco
 */
async function createTask(title) {
    try {
        // Usa Prisma para criar uma nova tarefa no banco
        // create() retorna a tarefa criada automaticamente
        const task = await prisma.task.create({
            data: {
                title: title.trim(),        // Remove espaços extras
                completed: false,           // Inicia como não concluída
                // createdAt é preenchido automaticamente pelo banco
            }
        });
        
        return task;
    } catch (error) {
        // Log do erro para debugging
        console.error('Erro ao criar tarefa no banco:', error);
        
        // Relança o erro para ser tratado no controller
        throw new Error('Erro ao criar tarefa no banco de dados');
    }
}

// ============================================
// SERVICE: Buscar Todas as Tarefas
// ============================================

/**
 * Busca todas as tarefas do banco de dados
 * 
 * @returns {Promise<Array>} Array com todas as tarefas
 * @throws {Error} Se ocorrer erro ao buscar no banco
 */
async function getAllTasks() {
    try {
        // Usa Prisma para buscar todas as tarefas
        // findMany() retorna todas as tarefas da tabela
        // orderBy ordena por data de criação (mais recentes primeiro)
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'  // Ordena do mais recente para o mais antigo
            }
        });
        
        return tasks;
    } catch (error) {
        // Log do erro para debugging
        console.error('Erro ao buscar tarefas no banco:', error);
        
        // Relança o erro para ser tratado no controller
        throw new Error('Erro ao buscar tarefas no banco de dados');
    }
}

// ============================================
// SERVICE: Buscar Tarefa por ID
// ============================================

/**
 * Busca uma tarefa específica pelo ID
 * 
 * @param {number} id - ID da tarefa a ser buscada
 * @returns {Promise<Object|null>} A tarefa encontrada ou null se não existir
 * @throws {Error} Se ocorrer erro ao buscar no banco
 */
async function getTaskById(id) {
    try {
        // Converte o ID para número (caso venha como string)
        const taskId = parseInt(id);
        
        // Usa Prisma para buscar a tarefa pelo ID
        // findUnique() busca por um campo único (id é chave primária)
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        });
        
        // Retorna null se não encontrar (mais semântico que undefined)
        return task || null;
    } catch (error) {
        // Log do erro para debugging
        console.error('Erro ao buscar tarefa no banco:', error);
        
        // Relança o erro para ser tratado no controller
        throw new Error('Erro ao buscar tarefa no banco de dados');
    }
}

// ============================================
// SERVICE: Atualizar Tarefa
// ============================================

/**
 * Atualiza uma tarefa existente no banco de dados
 * 
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {Object} updates - Objeto com os campos a serem atualizados
 * @param {string} [updates.title] - Novo título (opcional)
 * @param {boolean} [updates.completed] - Novo status de conclusão (opcional)
 * @returns {Promise<Object|null>} A tarefa atualizada ou null se não existir
 * @throws {Error} Se ocorrer erro ao atualizar no banco
 */
async function updateTask(id, updates) {
    try {
        // Converte o ID para número
        const taskId = parseInt(id);
        
        // Prepara o objeto de dados para atualização
        const data = {};
        
        // Se title foi fornecido, adiciona ao objeto de atualização
        if (updates.title !== undefined) {
            data.title = updates.title.trim();
        }
        
        // Se completed foi fornecido, adiciona ao objeto de atualização
        if (updates.completed !== undefined) {
            data.completed = Boolean(updates.completed);
        }
        
        // Usa Prisma para atualizar a tarefa
        // update() atualiza e retorna a tarefa atualizada
        // Se a tarefa não existir, lança um erro (PrismaNotFoundError)
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: data
        });
        
        return updatedTask;
    } catch (error) {
        // Verifica se o erro é porque a tarefa não foi encontrada
        if (error.code === 'P2025') {
            // P2025 é o código de erro do Prisma para registro não encontrado
            return null;
        }
        
        // Log do erro para debugging
        console.error('Erro ao atualizar tarefa no banco:', error);
        
        // Relança o erro para ser tratado no controller
        throw new Error('Erro ao atualizar tarefa no banco de dados');
    }
}

// ============================================
// SERVICE: Remover Tarefa
// ============================================

/**
 * Remove uma tarefa do banco de dados
 * 
 * @param {number} id - ID da tarefa a ser removida
 * @returns {Promise<boolean>} true se removida com sucesso, false se não existir
 * @throws {Error} Se ocorrer erro ao remover no banco
 */
async function deleteTask(id) {
    try {
        // Converte o ID para número
        const taskId = parseInt(id);
        
        // Usa Prisma para remover a tarefa
        // delete() remove e retorna a tarefa removida
        // Se a tarefa não existir, lança um erro (PrismaNotFoundError)
        await prisma.task.delete({
            where: {
                id: taskId
            }
        });
        
        // Se chegou aqui, a remoção foi bem-sucedida
        return true;
    } catch (error) {
        // Verifica se o erro é porque a tarefa não foi encontrada
        if (error.code === 'P2025') {
            // P2025 é o código de erro do Prisma para registro não encontrado
            return false;
        }
        
        // Log do erro para debugging
        console.error('Erro ao remover tarefa no banco:', error);
        
        // Relança o erro para ser tratado no controller
        throw new Error('Erro ao remover tarefa no banco de dados');
    }
}

// ============================================
// EXPORTAÇÃO DAS FUNÇÕES
// ============================================

// Exporta todas as funções do service para serem usadas nos controllers
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};

/* 
EXPLICAÇÃO DO ARQUIVO taskService.js:

Este arquivo contém a camada de serviço que acessa o banco de dados via Prisma.

1. Responsabilidades:
   - Acessar o banco de dados usando Prisma ORM
   - Transformar dados entre formato do banco e formato da aplicação
   - Tratar erros específicos do banco de dados
   - Abstrair a lógica de acesso aos dados

2. Funções CRUD:
   - createTask(): Cria nova tarefa no banco
   - getAllTasks(): Busca todas as tarefas
   - getTaskById(): Busca tarefa por ID
   - updateTask(): Atualiza tarefa existente
   - deleteTask(): Remove tarefa do banco

3. Prisma Client:
   - Instância única reutilizada em todas as operações
   - Gerado automaticamente pelo Prisma a partir do schema
   - Fornece métodos type-safe para acessar o banco

4. Tratamento de erros:
   - Captura erros específicos do Prisma (ex: P2025 = não encontrado)
   - Converte erros do banco em erros da aplicação
   - Loga erros para debugging

5. Vantagens desta camada:
   - Separação de responsabilidades (controller não acessa banco diretamente)
   - Fácil de testar (pode mockar o service)
   - Fácil de trocar de ORM (só muda este arquivo)
   - Código reutilizável

6. Fluxo de dados:
   Controller → Service → Prisma → Banco de Dados
   
   - Controller recebe requisição HTTP
   - Service faz operação no banco
   - Prisma traduz para SQL
   - Banco executa e retorna dados
   - Service formata resposta
   - Controller retorna JSON

Esta arquitetura segue o padrão de separação de responsabilidades:
- Routes: Define rotas
- Controllers: Lógica de negócio e validações
- Services: Acesso aos dados
- Prisma: ORM (Object-Relational Mapping)
*/

