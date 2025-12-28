# 🗄️ Instruções - Configuração do Banco de Dados

Este guia explica como configurar o banco de dados PostgreSQL com Prisma ORM para o projeto.

## 📋 Pré-requisitos

1. **Node.js instalado** (versão 18 ou superior)
2. **PostgreSQL instalado** ou usar SQLite para desenvolvimento local

## 🚀 Passo a Passo

### 1. Instalar Dependências

```bash
cd backend
npm install
```

Isso instalará:
- `@prisma/client` - Cliente Prisma para acessar o banco
- `prisma` - CLI do Prisma para migrations

### 2. Configurar Banco de Dados

#### Opção A: PostgreSQL (Recomendado)

1. **Instalar PostgreSQL:**
   - Windows: https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Criar banco de dados:**
   ```sql
   CREATE DATABASE todo_saas;
   ```

3. **Criar arquivo `.env` na pasta `backend/`:**
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/todo_saas"
   ```
   
   **Substitua:**
   - `usuario`: Seu usuário do PostgreSQL (geralmente `postgres`)
   - `senha`: Sua senha do PostgreSQL
   - `5432`: Porta do PostgreSQL (padrão é 5432)
   - `todo_saas`: Nome do banco de dados

#### Opção B: SQLite (Desenvolvimento Local)

Se não quiser instalar PostgreSQL, pode usar SQLite:

1. **Alterar `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "sqlite"  // Mudar de "postgresql" para "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Criar arquivo `.env`:**
   ```env
   DATABASE_URL="file:./dev.db"
   ```

### 3. Gerar Cliente Prisma

Após configurar o `.env`, gere o cliente Prisma:

```bash
npx prisma generate
```

Este comando:
- Lê o `schema.prisma`
- Gera o cliente Prisma com tipos TypeScript
- Permite usar `PrismaClient` no código

### 4. Criar Migration (Estrutura do Banco)

Execute a migration para criar as tabelas no banco:

```bash
npx prisma migrate dev --name init
```

Este comando:
- Cria a tabela `tasks` no banco de dados
- Gera arquivos de migration em `prisma/migrations/`
- Aplica as mudanças no banco

**O que será criado:**
```sql
CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(200) NOT NULL,
  "completed" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 5. (Opcional) Abrir Prisma Studio

Visualize e edite dados diretamente no banco:

```bash
npx prisma studio
```

Abre em: http://localhost:5555

### 6. Iniciar o Servidor

```bash
npm start
```

O servidor estará rodando em: http://localhost:3000

## 📁 Estrutura Criada

```
backend/
 ├── prisma/
 │   ├── schema.prisma          # Definição do modelo
 │   └── migrations/             # Histórico de migrations
 ├── src/
 │   ├── services/
 │   │   └── taskService.js      # Acesso ao banco via Prisma
 │   └── controllers/
 │       └── taskController.js   # Usa services
 └── .env                        # Configuração do banco
```

## 🔄 Comandos Úteis

### Gerar cliente Prisma
```bash
npx prisma generate
```

### Criar nova migration
```bash
npx prisma migrate dev --name nome_da_migration
```

### Aplicar migrations em produção
```bash
npx prisma migrate deploy
```

### Abrir Prisma Studio
```bash
npx prisma studio
```

### Resetar banco de dados (CUIDADO!)
```bash
npx prisma migrate reset
```

## 🧪 Testar a API

Após configurar tudo, teste as rotas:

```bash
# Criar tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Testar banco de dados"}'

# Listar tarefas
curl http://localhost:3000/tasks
```

## ⚠️ Problemas Comuns

### Erro: "Can't reach database server"
- Verifique se o PostgreSQL está rodando
- Confira a URL no `.env`
- Teste a conexão: `psql -U usuario -d todo_saas`

### Erro: "P1001: Can't reach database server"
- PostgreSQL não está rodando
- URL incorreta no `.env`
- Firewall bloqueando conexão

### Erro: "P1003: Database does not exist"
- Crie o banco: `CREATE DATABASE todo_saas;`
- Verifique o nome no `.env`

### Erro: "PrismaClient is not generated"
- Execute: `npx prisma generate`

## 📊 Fluxo de Dados

```
Cliente HTTP
    ↓
Routes (taskRoutes.js)
    ↓
Controllers (taskController.js)
    ↓
Services (taskService.js)
    ↓
Prisma Client
    ↓
PostgreSQL Database
```

## ✅ Checklist

- [ ] Node.js instalado
- [ ] PostgreSQL instalado OU SQLite configurado
- [ ] Arquivo `.env` criado com `DATABASE_URL`
- [ ] Dependências instaladas (`npm install`)
- [ ] Cliente Prisma gerado (`npx prisma generate`)
- [ ] Migration executada (`npx prisma migrate dev`)
- [ ] Servidor iniciado (`npm start`)
- [ ] API testada

## 🎉 Pronto!

Agora suas tarefas são persistidas no banco de dados! Mesmo reiniciando o servidor, os dados permanecem.

