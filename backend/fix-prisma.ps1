# Script para resolver erro EPERM do Prisma no Windows

Write-Host "Limpando cache do Prisma..." -ForegroundColor Yellow

# Para qualquer processo Node que possa estar usando o Prisma
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Aguarda um pouco
Start-Sleep -Seconds 2

# Remove a pasta .prisma
if (Test-Path "node_modules\.prisma") {
    Remove-Item -Path "node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Cache do Prisma removido." -ForegroundColor Green
}

# Aguarda mais um pouco
Start-Sleep -Seconds 1

Write-Host "Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "Prisma Client gerado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Erro ao gerar Prisma Client. Tente:" -ForegroundColor Red
    Write-Host "1. Fechar o Cursor/IDE completamente" -ForegroundColor Yellow
    Write-Host "2. Executar este script como Administrador" -ForegroundColor Yellow
    Write-Host "3. Verificar se o antivírus não está bloqueando" -ForegroundColor Yellow
}




