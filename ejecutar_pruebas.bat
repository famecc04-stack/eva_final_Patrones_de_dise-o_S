@echo off
title TechSolutions - Pruebas Unitarias de Patrones GoF y GRASP
color 0A
echo ========================================================================
echo     TECHSOLUTIONS S.A. - EVALUACION FINAL ZEGEL
echo     EJECUTANDO SUITE DE 22 PRUEBAS UNITARIAS DE PATRONES
echo ========================================================================
echo.
node --test "%~dp0runnable_unit_tests.test.js"
echo.
echo ========================================================================
echo     Presiona cualquier tecla para cerrar esta ventana...
echo ========================================================================
pause >nul
