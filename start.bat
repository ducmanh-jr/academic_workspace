@echo off
setlocal

cd /d "%~dp0"
title JRFN Algorithm - Dev Server

echo.
echo ========================================
echo   JRFN Algorithm - Start Development
echo ========================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Khong tim thay npm. Hay cai Node.js truoc:
  echo         https://nodejs.org/
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo [1/3] Dang cai dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install that bai.
    pause
    exit /b 1
  )
) else (
  echo [1/3] Dependencies da san sang.
)

if exist ".next" (
  echo [2/3] Dang don cache .next de tranh loi dev server cu...
  rmdir /s /q ".next"
) else (
  echo [2/3] Cache sach.
)

echo [3/3] Dang mo http://localhost:3000 ...
start "" "http://localhost:3000"

echo.
echo Server dang chay. Nhan Ctrl + C de dung.
echo.
call npm run dev -- --port 3000

echo.
pause
