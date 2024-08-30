@echo off
echo Instalando dependências do back-end...
cd back
npm install
echo Dependências do back-end instaladas.

echo Instalando dependências do front-end...
cd ../front
npm install
echo Dependências do front-end instaladas.

echo Todas as dependências foram instaladas com sucesso!
pause
