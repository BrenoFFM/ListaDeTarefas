// ============================================
// CONFIGURAÇÃO DA API
// ============================================

// URL base da API REST
// Em produção, usa a mesma origem (URL relativa)
// Em desenvolvimento, pode usar localhost:3000 se necessário
const API_BASE_URL = window.location.origin;

// Endpoint completo para tarefas
const API_TASKS_URL = `${API_BASE_URL}/tasks`;

// ============================================
// DECLARAÇÃO DE VARIÁVEIS GLOBAIS
// ============================================

// Referência ao campo de input onde o usuário digita a tarefa
const taskInput = document.getElementById('taskInput');

// Referência ao botão que adiciona novas tarefas
const addButton = document.getElementById('addButton');

// Referência à lista (ul) onde as tarefas serão exibidas
const taskList = document.getElementById('taskList');

// ============================================
// FUNÇÃO: Buscar Tarefas da API
// ============================================

/**
 * Função assíncrona que busca todas as tarefas do servidor
 * Faz uma requisição GET para /tasks e retorna os dados
 * 
 * @returns {Promise<Array>} Array com todas as tarefas
 */
async function fetchTasks() {
    try {
        // Faz uma requisição GET para a API
        // fetch retorna uma Promise que resolve com a resposta HTTP
        const response = await fetch(API_TASKS_URL);
        
        // Verifica se a resposta foi bem-sucedida (status 200-299)
        if (!response.ok) {
            // Se não foi bem-sucedida, lança um erro
            throw new Error(`Erro ao buscar tarefas: ${response.status}`);
        }
        
        // Converte a resposta de JSON para objeto JavaScript
        // response.json() também retorna uma Promise
        const data = await response.json();
        
        // Retorna o array de tarefas (data.data contém as tarefas)
        return data.data || [];
    } catch (error) {
        // Se ocorrer algum erro na requisição, exibe mensagem e retorna array vazio
        console.error('Erro ao buscar tarefas:', error);
        alert('Erro ao carregar tarefas. Verifique se o servidor está rodando.');
        return [];
    }
}

// ============================================
// FUNÇÃO: Criar Nova Tarefa na API
// ============================================

/**
 * Função assíncrona que cria uma nova tarefa no servidor
 * Faz uma requisição POST para /tasks com o título da tarefa
 * 
 * @param {string} title - Título da tarefa a ser criada
 * @returns {Promise<Object|null>} A tarefa criada ou null em caso de erro
 */
async function createTaskInAPI(title) {
    try {
        // Faz uma requisição POST para a API
        // fetch recebe a URL e um objeto de opções
        const response = await fetch(API_TASKS_URL, {
            method: 'POST',                    // Método HTTP POST
            headers: {
                'Content-Type': 'application/json'  // Indica que estamos enviando JSON
            },
            body: JSON.stringify({            // Converte objeto JavaScript para JSON
                title: title                  // Envia o título da tarefa
            })
        });
        
        // Verifica se a resposta foi bem-sucedida (status 201 Created)
        if (!response.ok) {
            // Se não foi bem-sucedida, tenta obter a mensagem de erro
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ao criar tarefa: ${response.status}`);
        }
        
        // Converte a resposta de JSON para objeto JavaScript
        const data = await response.json();
        
        // Retorna a tarefa criada (data.data contém a tarefa)
        return data.data || null;
    } catch (error) {
        // Se ocorrer algum erro na requisição, exibe mensagem e retorna null
        console.error('Erro ao criar tarefa:', error);
        alert(`Erro ao criar tarefa: ${error.message}`);
        return null;
    }
}

// ============================================
// FUNÇÃO: Atualizar Tarefa na API
// ============================================

/**
 * Função assíncrona que atualiza uma tarefa no servidor
 * Faz uma requisição PUT para /tasks/:id com os dados a atualizar
 * 
 * @param {number} taskId - ID da tarefa a ser atualizada
 * @param {Object} updates - Objeto com os campos a serem atualizados
 * @returns {Promise<Object|null>} A tarefa atualizada ou null em caso de erro
 */
async function updateTaskInAPI(taskId, updates) {
    try {
        // Monta a URL com o ID da tarefa
        const url = `${API_TASKS_URL}/${taskId}`;
        
        // Faz uma requisição PUT para a API
        const response = await fetch(url, {
            method: 'PUT',                    // Método HTTP PUT
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)     // Envia os dados de atualização
        });
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ao atualizar tarefa: ${response.status}`);
        }
        
        // Converte a resposta de JSON para objeto JavaScript
        const data = await response.json();
        
        // Retorna a tarefa atualizada
        return data.data || null;
    } catch (error) {
        // Se ocorrer algum erro na requisição, exibe mensagem e retorna null
        console.error('Erro ao atualizar tarefa:', error);
        alert(`Erro ao atualizar tarefa: ${error.message}`);
        return null;
    }
}

// ============================================
// FUNÇÃO: Remover Tarefa da API
// ============================================

/**
 * Função assíncrona que remove uma tarefa do servidor
 * Faz uma requisição DELETE para /tasks/:id
 * 
 * @param {number} taskId - ID da tarefa a ser removida
 * @returns {Promise<boolean>} true se removida com sucesso, false em caso de erro
 */
async function deleteTaskInAPI(taskId) {
    try {
        // Monta a URL com o ID da tarefa
        const url = `${API_TASKS_URL}/${taskId}`;
        
        // Faz uma requisição DELETE para a API
        const response = await fetch(url, {
            method: 'DELETE'                  // Método HTTP DELETE
        });
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ao remover tarefa: ${response.status}`);
        }
        
        // Retorna true indicando sucesso
        return true;
    } catch (error) {
        // Se ocorrer algum erro na requisição, exibe mensagem e retorna false
        console.error('Erro ao remover tarefa:', error);
        alert(`Erro ao remover tarefa: ${error.message}`);
        return false;
    }
}

// ============================================
// FUNÇÃO: Renderizar Tarefa na Tela
// ============================================

/**
 * Função que cria e renderiza um elemento HTML para uma tarefa
 * 
 * @param {Object} task - Objeto da tarefa com id, title e completed
 */
function renderTask(task) {
    // Cria um novo elemento <li> para representar a tarefa
    const taskItem = document.createElement('li');
    
    // Adiciona a classe 'task-item' para aplicar os estilos CSS
    taskItem.classList.add('task-item');
    
    // Define um ID único usando o ID da tarefa do servidor
    taskItem.id = `task-${task.id}`;
    
    // Se a tarefa estiver concluída, adiciona a classe 'completed'
    if (task.completed) {
        taskItem.classList.add('completed');
    }
    
    // Cria um elemento <span> para exibir o texto da tarefa
    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = task.title;
    
    // Cria o botão "Concluir" ou "Desfazer"
    const completeButton = document.createElement('button');
    completeButton.classList.add('task-button', 'complete-button');
    completeButton.textContent = task.completed ? 'Desfazer' : 'Concluir';
    
    // Adiciona evento de clique para alternar o estado de conclusão
    completeButton.addEventListener('click', async function() {
        // Chama a API para atualizar o status da tarefa
        const updatedTask = await updateTaskInAPI(task.id, {
            completed: !task.completed  // Inverte o estado atual
        });
        
        // Se a atualização foi bem-sucedida, recarrega a lista de tarefas
        if (updatedTask) {
            await loadTasks();
        }
    });
    
    // Cria o botão "Remover"
    const removeButton = document.createElement('button');
    removeButton.classList.add('task-button', 'remove-button');
    removeButton.textContent = 'Remover';
    
    // Adiciona evento de clique para remover a tarefa
    removeButton.addEventListener('click', async function() {
        // Solicita confirmação do usuário antes de remover
        const confirmRemove = confirm('Tem certeza que deseja remover esta tarefa?');
        
        if (confirmRemove) {
            // Chama a API para remover a tarefa
            const deleted = await deleteTaskInAPI(task.id);
            
            // Se a remoção foi bem-sucedida, recarrega a lista de tarefas
            if (deleted) {
                await loadTasks();
            }
        }
    });
    
    // Adiciona todos os elementos ao item da tarefa
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(removeButton);
    
    // Adiciona o item à lista
    taskList.appendChild(taskItem);
}

// ============================================
// FUNÇÃO: Carregar e Renderizar Todas as Tarefas
// ============================================

/**
 * Função assíncrona que carrega todas as tarefas da API e renderiza na tela
 */
async function loadTasks() {
    try {
        // Limpa a lista atual (remove todos os itens)
        taskList.innerHTML = '';
        
        // Busca todas as tarefas da API
        const tasks = await fetchTasks();
        
        // Renderiza cada tarefa na tela
        tasks.forEach(task => {
            renderTask(task);
        });
    } catch (error) {
        // Se ocorrer algum erro, exibe mensagem
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas. Verifique se o servidor está rodando.');
    }
}

// ============================================
// FUNÇÃO: Adicionar Nova Tarefa
// ============================================

/**
 * Função assíncrona que adiciona uma nova tarefa
 * Valida o input, cria a tarefa na API e recarrega a lista
 */
async function addTask() {
    // Obtém o valor digitado no campo de input e remove espaços em branco
    const taskText = taskInput.value.trim();
    
    // Validação: verifica se o campo não está vazio
    if (taskText === '') {
        alert('Por favor, digite uma tarefa antes de adicionar!');
        taskInput.focus();
        return;
    }
    
    // Desabilita o botão para evitar múltiplos cliques
    addButton.disabled = true;
    addButton.textContent = 'Adicionando...';
    
    try {
        // Cria a tarefa na API
        const newTask = await createTaskInAPI(taskText);
        
        // Se a tarefa foi criada com sucesso
        if (newTask) {
            // Limpa o campo de input
            taskInput.value = '';
            
            // Recarrega todas as tarefas para atualizar a lista
            await loadTasks();
        }
    } finally {
        // Reabilita o botão independente de sucesso ou erro
        addButton.disabled = false;
        addButton.textContent = 'Adicionar';
        
        // Coloca o foco de volta no campo de input
        taskInput.focus();
    }
}

// ============================================
// EVENT LISTENERS (Ouvintes de Eventos)
// ============================================

// Adiciona um evento de clique ao botão "Adicionar"
addButton.addEventListener('click', addTask);

// Adiciona um evento de tecla pressionada ao campo de input
// Permite adicionar tarefas pressionando Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Função que inicializa a aplicação quando a página carrega
 */
async function init() {
    // Coloca o foco no campo de input
    taskInput.focus();
    
    // Carrega todas as tarefas da API
    await loadTasks();
}

// Executa a inicialização quando o DOM estiver pronto
// DOMContentLoaded garante que o HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', init);

/* 
EXPLICAÇÃO DO ARQUIVO JAVASCRIPT:

Este arquivo integra o frontend com o backend através de uma API REST.

1. COMUNICAÇÃO COM A API:
   - Utiliza fetch API para fazer requisições HTTP
   - Todas as funções são assíncronas (async/await)
   - Trata erros de requisição adequadamente
   - URL base: http://localhost:3000

2. FUNÇÕES PRINCIPAIS:
   a) fetchTasks():
      - GET /tasks
      - Busca todas as tarefas do servidor
      - Retorna array de tarefas
   
   b) createTaskInAPI():
      - POST /tasks
      - Cria nova tarefa no servidor
      - Envia { "title": "..." } no body
   
   c) updateTaskInAPI():
      - PUT /tasks/:id
      - Atualiza tarefa existente
      - Envia { "completed": true/false } ou { "title": "..." }
   
   d) deleteTaskInAPI():
      - DELETE /tasks/:id
      - Remove tarefa do servidor
   
   e) renderTask():
      - Cria elementos HTML para exibir uma tarefa
      - Adiciona eventos de clique nos botões
      - Conecta ações do usuário às funções da API

3. FLUXO DE FUNCIONAMENTO:
   a) Ao carregar a página:
      - init() é executada
      - loadTasks() busca tarefas da API
      - renderTask() cria elementos HTML para cada tarefa
   
   b) Ao adicionar tarefa:
      - Usuário digita e clica "Adicionar"
      - addTask() valida e chama createTaskInAPI()
      - Após sucesso, loadTasks() recarrega a lista
   
   c) Ao concluir tarefa:
      - Usuário clica "Concluir"
      - updateTaskInAPI() atualiza no servidor
      - loadTasks() recarrega a lista atualizada
   
   d) Ao remover tarefa:
      - Usuário clica "Remover" e confirma
      - deleteTaskInAPI() remove do servidor
      - loadTasks() recarrega a lista

4. TRATAMENTO DE ERROS:
   - Try/catch em todas as funções assíncronas
   - Mensagens de erro claras para o usuário
   - Logs no console para debugging
   - Validação de respostas HTTP

5. EXPERIÊNCIA DO USUÁRIO:
   - Feedback visual (botão desabilitado durante requisição)
   - Confirmação antes de remover
   - Lista sempre sincronizada com o servidor
   - Mensagens de erro amigáveis

6. DIFERENÇAS DA VERSÃO ANTERIOR:
   - Dados vêm do servidor, não são armazenados localmente
   - Tarefas persistem enquanto o servidor estiver rodando
   - Requisições HTTP para todas as operações
   - Sincronização automática após cada operação

A aplicação agora é full stack: frontend consome API REST do backend!
*/
