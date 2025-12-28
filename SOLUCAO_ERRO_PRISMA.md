# 🔧 Solução para Erro EPERM do Prisma no Windows

## ❌ Erro
```
EPERM: operation not permitted, rename '...query_engine-windows.dll.node.tmp...' -> '...query_engine-windows.dll.node'
```

## 🔍 Causa
Este erro geralmente ocorre quando:
- O arquivo está sendo usado por outro processo (IDE, servidor Node, etc.)
- Antivírus está bloqueando a operação
- Permissões insuficientes no Windows

## ✅ Soluções (Tente nesta ordem)

### Solução 1: Fechar Processos e Tentar Novamente

1. **Feche completamente o Cursor/VS Code**
2. **Feche qualquer servidor Node.js rodando** (Ctrl+C no terminal)
3. **Abra um novo PowerShell** (não precisa ser como Admin)
4. Execute:
```powershell
cd C:\Users\Breno\Desktop\ListaDeTarefas\backend
npx prisma generate
```

### Solução 2: Usar o Script de Correção

Execute o script que criamos:
```powershell
cd C:\Users\Breno\Desktop\ListaDeTarefas\backend
.\fix-prisma.ps1
```

### Solução 3: Executar como Administrador

1. **Feche o Cursor completamente**
2. **Clique com botão direito no PowerShell**
3. **Selecione "Executar como administrador"**
4. Execute:
```powershell
cd C:\Users\Breno\Desktop\ListaDeTarefas\backend
npx prisma generate
```

### Solução 4: Verificar Antivírus

1. **Adicione exceção no Windows Defender:**
   - Abra "Segurança do Windows"
   - Vá em "Proteção contra vírus e ameaças"
   - Clique em "Gerenciar configurações"
   - Adicione exceção para a pasta `node_modules\.prisma`

### Solução 5: Limpar Manualmente

1. **Feche tudo** (Cursor, servidores, etc.)
2. **Delete manualmente a pasta:**
   ```
   C:\Users\Breno\Desktop\ListaDeTarefas\backend\node_modules\.prisma
   ```
3. **Execute novamente:**
```powershell
npx prisma generate
```

### Solução 6: Reinstalar Dependências

Se nada funcionar:
```powershell
cd C:\Users\Breno\Desktop\ListaDeTarefas\backend
Remove-Item -Path "node_modules" -Recurse -Force
npm install
npx prisma generate
```

## 🚀 Solução Rápida (Mais Comum)

**A solução mais comum é simplesmente fechar o Cursor/IDE e executar o comando em um terminal externo:**

1. Feche o Cursor
2. Abra PowerShell normal
3. Execute:
```powershell
cd C:\Users\Breno\Desktop\ListaDeTarefas\backend
npx prisma generate
```

## ⚠️ Importante

- **Não é necessário** executar `prisma generate` toda vez
- Só precisa executar quando:
  - Instalar o Prisma pela primeira vez
  - Alterar o `schema.prisma`
  - Após `npm install` em um projeto novo

## 📝 Nota

Este erro é comum no Windows e geralmente é resolvido fechando processos que estão usando o arquivo. O Prisma Client já está gerado e funcionando - você só precisa regenerar se alterou o schema.




