# 📋 API REST - Lista de Tarefas (Backend)

API REST simples e didática para gerenciamento de tarefas, desenvolvida com Node.js e Express.

## 🎯 Objetivo

Criar uma API REST funcional que permita criar, listar, atualizar e remover tarefas, utilizando dados em memória (sem banco de dados nesta fase).

## 📁 Estrutura do Projeto

```
backend/
 ├── src/
 │   ├── routes/
 │   │   └── taskRoutes.js      # Definição das rotas da API
 │   ├── controllers/
 │   │   └── taskController.js   # Lógica de negócio e validações
 │   ├── data/
 │   │   └── tasks.js            # Armazenamento de dados em memória
 │   ├── app.js                  # Configuração do Express
 │   └── server.js               # Inicialização do servidor
 ├── package.json                # Dependências e scripts
 └── README.md                   # Este arquivo
```

## 🚀 Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o servidor:**
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000
```

### 1. Listar Todas as Tarefas
**GET** `/tasks`

Retorna todas as tarefas cadastradas.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Estudar JavaScript",
      "completed": false
    },
    {
      "id": 2,
      "title": "Fazer exercícios",
      "completed": true
    }
  ],
  "count": 2
}
```

---

### 2. Buscar Tarefa por ID
**GET** `/tasks/:id`

Retorna uma tarefa específica pelo ID.

**Parâmetros:**
- `id` (number) - ID da tarefa

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Estudar JavaScript",
    "completed": false
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Tarefa com ID 999 não encontrada"
}
```

---

### 3. Criar Nova Tarefa
**POST** `/tasks`

Cria uma nova tarefa.

**Body (JSON):**
```json
{
  "title": "Estudar JavaScript"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "data": {
    "id": 1,
    "title": "Estudar JavaScript",
    "completed": false
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "O campo \"title\" é obrigatório"
}
```

---

### 4. Atualizar Tarefa
**PUT** `/tasks/:id`

Atualiza uma tarefa existente.

**Parâmetros:**
- `id` (number) - ID da tarefa

**Body (JSON):**
```json
{
  "title": "Estudar JavaScript avançado"
}
```

ou

```json
{
  "completed": true
}
```

ou ambos:

```json
{
  "title": "Estudar JavaScript avançado",
  "completed": true
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Tarefa atualizada com sucesso",
  "data": {
    "id": 1,
    "title": "Estudar JavaScript avançado",
    "completed": true
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Tarefa com ID 999 não encontrada"
}
```

---

### 5. Remover Tarefa
**DELETE** `/tasks/:id`

Remove uma tarefa permanentemente.

**Parâmetros:**
- `id` (number) - ID da tarefa

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Tarefa removida com sucesso"
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Tarefa com ID 999 não encontrada"
}
```

---

## 🧪 Testando a API

### Usando Postman

1. **Instale o Postman:** [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Criar uma tarefa:**
   - Método: `POST`
   - URL: `http://localhost:3000/tasks`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "title": "Minha primeira tarefa"
   }
   ```

3. **Listar todas as tarefas:**
   - Método: `GET`
   - URL: `http://localhost:3000/tasks`

4. **Atualizar uma tarefa:**
   - Método: `PUT`
   - URL: `http://localhost:3000/tasks/1`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "completed": true
   }
   ```

5. **Remover uma tarefa:**
   - Método: `DELETE`
   - URL: `http://localhost:3000/tasks/1`

### Usando Insomnia

1. **Instale o Insomnia:** [https://insomnia.rest/download](https://insomnia.rest/download)

2. Siga os mesmos passos do Postman, adaptando a interface.

### Usando cURL (Terminal)

**Criar tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar JavaScript"}'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tasks
```

**Atualizar tarefa:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Remover tarefa:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### Usando JavaScript (Fetch API)

```javascript
// Criar tarefa
fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Estudar JavaScript'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Listar tarefas
fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(data => console.log(data));

// Atualizar tarefa
fetch('http://localhost:3000/tasks/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    completed: true
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Remover tarefa
fetch('http://localhost:3000/tasks/1', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📊 Modelo de Dados

Cada tarefa possui a seguinte estrutura:

```json
{
  "id": 1,                    // Número único gerado automaticamente
  "title": "Estudar JavaScript", // Título da tarefa (string, obrigatório)
  "completed": false          // Status de conclusão (boolean, padrão: false)
}
```

## ⚠️ Validações

- **Título obrigatório:** O campo `title` é obrigatório ao criar/atualizar
- **Título não vazio:** O título não pode ser uma string vazia
- **Limite de caracteres:** O título não pode ter mais de 200 caracteres
- **Completed booleano:** O campo `completed` deve ser `true` ou `false`
- **ID válido:** O ID deve existir para atualizar/remover tarefas

## 🔢 Códigos de Status HTTP

- **200 OK:** Requisição bem-sucedida
- **201 Created:** Recurso criado com sucesso
- **400 Bad Request:** Dados inválidos na requisição
- **404 Not Found:** Recurso não encontrado
- **500 Internal Server Error:** Erro interno do servidor

## 🏗️ Arquitetura

A API segue o padrão **MVC (Model-View-Controller)**:

- **Model (Dados):** `src/data/tasks.js` - Gerencia armazenamento em memória
- **View (Respostas):** JSON responses - Formato de resposta da API
- **Controller:** `src/controllers/taskController.js` - Lógica de negócio
- **Routes:** `src/routes/taskRoutes.js` - Definição de rotas

## 📝 Estrutura de Resposta

Todas as respostas seguem um padrão consistente:

**Sucesso:**
```json
{
  "success": true,
  "message": "Mensagem opcional",
  "data": { ... }
}
```

**Erro:**
```json
{
  "success": false,
  "message": "Mensagem de erro",
  "error": "Detalhes do erro (apenas em desenvolvimento)"
}
```

## 🔄 Próximos Passos

Esta API está preparada para:

- ✅ Conectar a um banco de dados (MySQL, PostgreSQL, MongoDB, etc.)
- ✅ Adicionar autenticação e autorização
- ✅ Adicionar paginação nas listagens
- ✅ Adicionar filtros e busca
- ✅ Conectar ao frontend desenvolvido anteriormente

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **JSON** - Formato de dados

## 📚 Recursos Adicionais

- [Documentação do Express](https://expressjs.com/)
- [Documentação do Node.js](https://nodejs.org/docs/)

## 👨‍💻 Desenvolvimento

Para desenvolvimento, você pode usar:

```bash
# Iniciar servidor
npm start

# O servidor estará em http://localhost:3000
```

## ⚡ Notas Importantes

- **Dados em memória:** Os dados são perdidos quando o servidor é reiniciado
- **Sem autenticação:** A API não possui autenticação nesta fase
- **CORS:** Pode ser necessário configurar CORS para conectar ao frontend
- **Porta:** A porta padrão é 3000, mas pode ser alterada via variável de ambiente `PORT`

---

**Desenvolvido com foco em clareza, organização e aprendizado.** 🚀

