@echo off
title MyShoppy JSON Server
echo ============================================
echo   MyShoppy JSON Server
echo   Serving db.json on http://0.0.0.0:3000
echo.
echo   Endpoints:
echo     GET  /products
echo     GET  /products/:id
echo     POST /orders
echo.
echo   Keep this window OPEN while using the app.
echo ============================================
echo.
cd /d "%~dp0"
npx json-server --watch db.json --host 0.0.0.0 --port 3000
pause
