@echo off
set BACK_PORT=3001
set FRONT_PORT=3000
set INSTALLED_FILE=.installed

REM Verifica se o back-end já está rodando
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%BACK_PORT%') do (
    set BACK_PID=%%a
)
if not defined BACK_PID (
    echo Iniciando o back-end...
    start cmd /k "cd back && npm start"
) else (
    echo Back-end já está rodando na porta %BACK_PORT%.
)

REM Verifica se o front-end já está rodando
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%FRONT_PORT%') do (
    set FRONT_PID=%%a
)
if not defined FRONT_PID (
    echo Iniciando o front-end...
    start cmd /k "cd front && npm start"
) else (
    echo Front-end já está rodando na porta %FRONT_PORT%.
)

REM Pausa para garantir que os servidores tenham tempo para iniciar
timeout /t 5 /nobreak > nul

REM Abre o navegador no localhost:3000
start http://localhost:%FRONT_PORT%

echo O sistema está em execução. Pressione qualquer tecla para sair.
pause
