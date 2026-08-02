@echo off
title MyShoppy Expo App
echo ============================================
echo   MyShoppy Expo App
echo   Make sure JSON Server is running first!
echo   (Double-click start-server.bat)
echo ============================================
echo.
cd /d "%~dp0"
npx expo start
pause
