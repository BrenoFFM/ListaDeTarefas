# 🔍 Como Verificar se Node.js está Instalado

## Passo 1: Verificar Node.js
Abra o PowerShell ou CMD e execute:
```bash
node --version
```

Você deve ver algo como: `v20.x.x` ou `v18.x.x`

## Passo 2: Verificar npm
Execute:
```bash
npm --version
```

Você deve ver algo como: `10.x.x` ou `9.x.x`

## ✅ Se ambos funcionarem:
- Node.js está instalado corretamente
- Você pode prosseguir com `npm install` e `npm start`

## ❌ Se der erro "não é reconhecido":
- Node.js não está instalado OU
- Node.js não está no PATH do sistema

### Solução:
1. Instale o Node.js em: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador
4. **IMPORTANTE**: Reinicie o terminal após instalar
5. Teste novamente com `node --version`

