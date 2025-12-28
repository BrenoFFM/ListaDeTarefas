# 🚀 Guia de Deploy no Vercel

Este guia explica como fazer o deploy da aplicação Lista de Tarefas no Vercel.

## 📋 Pré-requisitos

1. **Conta no Vercel** - Crie em [vercel.com](https://vercel.com)
2. **Conta no GitHub/GitLab/Bitbucket** - Para conectar o repositório
3. **Banco de dados PostgreSQL** - O Vercel não suporta SQLite, então você precisará de um banco PostgreSQL

## 🗄️ Configurar Banco de Dados PostgreSQL

### Opção 1: Vercel Postgres (Recomendado)

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Storage** → **Create Database** → **Postgres**
3. Escolha um nome e região
4. Copie a **Connection String** que será usada como `DATABASE_URL`

### Opção 2: Serviços Externos

Você pode usar serviços gratuitos como:
- **Supabase** - [supabase.com](https://supabase.com) (gratuito)
- **Neon** - [neon.tech](https://neon.tech) (gratuito)
- **Railway** - [railway.app](https://railway.app) (gratuito)

## 📝 Passo a Passo

### 1. Preparar o Projeto

Certifique-se de que:
- ✅ Todos os arquivos estão commitados no Git
- ✅ O repositório está no GitHub/GitLab/Bitbucket
- ✅ O arquivo `vercel.json` está na raiz do projeto
- ✅ O arquivo `package.json` está na raiz do projeto

### 2. Atualizar Schema do Prisma para PostgreSQL

**IMPORTANTE:** O projeto está configurado para SQLite. Para produção no Vercel, você precisa usar PostgreSQL.

Edite o arquivo `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Mudar de "sqlite" para "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Fazer Deploy no Vercel

#### Método 1: Via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New Project**
3. Importe seu repositório do GitHub/GitLab/Bitbucket
4. Configure o projeto:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (raiz do projeto)
   - **Build Command:** `npm run vercel-build` ou `cd backend && npm install && npx prisma generate`
   - **Output Directory:** (deixe vazio)
   - **Install Command:** `npm install`
   - **Development Command:** (deixe vazio)

5. **Configure as Variáveis de Ambiente:**
   - Clique em **Environment Variables**
   - Adicione:
     - `DATABASE_URL` = sua connection string do PostgreSQL
     - `NODE_ENV` = `production`

6. Clique em **Deploy**

#### Método 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# No diretório do projeto
vercel

# Seguir as instruções no terminal
```

### 4. Executar Migrations

Após o deploy, você precisa executar as migrations do Prisma:

```bash
# Via Vercel CLI
vercel env pull .env.local
cd backend
npx prisma migrate deploy
```

Ou configure um script de build que execute automaticamente:

No `package.json` da raiz, atualize o build:

```json
{
  "scripts": {
    "build": "cd backend && npm install && npx prisma generate && npx prisma migrate deploy"
  }
}
```

### 5. Verificar o Deploy

Após o deploy, você receberá uma URL como:
- `https://seu-projeto.vercel.app`

Acesse a URL e teste:
- ✅ A página inicial carrega
- ✅ As tarefas podem ser criadas
- ✅ As tarefas persistem no banco de dados

## 🔧 Configurações Importantes

### Variáveis de Ambiente no Vercel

No painel do Vercel, vá em **Settings** → **Environment Variables** e adicione:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `DATABASE_URL` | `postgresql://...` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### Build Settings

No `vercel.json`, o projeto está configurado para:
- Servir a API em `/tasks` e `/api`
- Servir arquivos estáticos do frontend
- Redirecionar todas as rotas para o servidor Express

## 🐛 Troubleshooting

### Erro: "Prisma Client not generated"

**Solução:** Adicione `prisma generate` no script de build:

```json
{
  "scripts": {
    "build": "cd backend && npm install && npx prisma generate"
  }
}
```

### Erro: "Database connection failed"

**Solução:** 
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o banco PostgreSQL está acessível
- Verifique se o schema do Prisma está configurado para `postgresql`

### Erro: "404 Not Found"

**Solução:**
- Verifique se o `vercel.json` está na raiz do projeto
- Confirme que as rotas estão configuradas corretamente
- Verifique os logs no painel do Vercel

### Erro: "Module not found"

**Solução:**
- Certifique-se de que todas as dependências estão no `package.json`
- Execute `npm install` localmente para verificar
- Verifique se o `node_modules` está no `.gitignore`

## 📊 Monitoramento

Após o deploy, você pode:
- Ver logs em tempo real no painel do Vercel
- Monitorar performance na aba **Analytics**
- Ver erros na aba **Functions**

## 🔄 Atualizações

Para atualizar o projeto:

1. Faça as alterações no código
2. Commit e push para o repositório
3. O Vercel fará deploy automático

Ou manualmente:

```bash
vercel --prod
```

## ✅ Checklist Final

Antes de fazer deploy, verifique:

- [ ] Schema do Prisma configurado para `postgresql`
- [ ] Arquivo `vercel.json` na raiz
- [ ] Arquivo `package.json` na raiz
- [ ] Variável `DATABASE_URL` configurada no Vercel
- [ ] Migrations do Prisma executadas
- [ ] Testes locais funcionando
- [ ] Código commitado no Git

## 🎉 Pronto!

Sua aplicação está no ar! Compartilhe a URL com seus usuários.

---

**Dúvidas?** Consulte a [documentação do Vercel](https://vercel.com/docs)

