@echo off
echo ================================================
echo   Who Wants to Be a Millionaire - Game Launcher
echo ================================================
echo.
echo Starting local server and opening game...
echo Press Ctrl+C in this window to stop when done.
echo.

cd /d "%~dp0"

REM Get local IP address for network access
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do set IP=%%a
set IP=%IP:~1%

REM Check for Node.js first
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Using Node.js server...
    echo.
    echo Opening on this computer: http://127.0.0.1:8080
    echo.
    echo To access from another device on the network:
    echo   http://%IP%:8080
    echo.
    timeout /t 2 /nobreak >nul
    start http://127.0.0.1:8080
    npx -y http-server -p 8080 -a 0.0.0.0 -c-1 --silent
    goto :end
)

REM Try Python if Node.js not available
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Using Python server...
    echo.
    echo Opening on this computer: http://127.0.0.1:8000
    echo.
    echo To access from another device on the network:
    echo   http://%IP%:8000
    echo.
    start http://127.0.0.1:8000
    timeout /t 2 /nobreak >nul
    python -m http.server 8000 --bind 0.0.0.0
    goto :end
)

REM No server found
echo.
echo ================================================
echo   ERROR: No server software found!
echo ================================================
echo.
echo This game needs a local web server to run.
echo Please install ONE of these:
echo.
echo Option 1: Node.js (Recommended)
echo   Download: https://nodejs.org
echo.
echo Option 2: Python
echo   Download: https://python.org
echo.
echo Or use Firefox browser:
echo   Right-click index.html ^> Open With ^> Firefox
echo.
pause

:end
