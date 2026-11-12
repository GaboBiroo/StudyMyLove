@echo off
title Dream Land Academy — Estudos da Thaisa
cd /d "%~dp0"

echo ========================================================
echo   Dream Land Academy - Estudos da Thaisa
echo   Engenharia Mecanica, Eletrica e Concursos Petrobras
echo ========================================================
echo.

if not exist "node_modules" (
  echo [1/3] Instalando dependencias pela primeira vez...
  call npm install
)

if not exist "dist" (
  echo [2/3] Compilando versao otimizada da plataforma...
  call npm run build
)

echo [3/3] Iniciando servidor local em http://localhost:4173 ...
start "" http://localhost:4173
call npm run preview -- --port 4173 --host 127.0.0.1
pause
