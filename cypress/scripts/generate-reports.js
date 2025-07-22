const report = require("multiple-cucumber-html-reporter");
const fs = require("fs");
const path = require("path");

// Generar reporte HTML de Cucumber
report.generate({
  jsonDir: "cypress/reports/cucumber-json",
  reportPath: "cypress/reports/cucumber-html",
  metadata: {
    browser: {
      name: "chrome",
      version: "119",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "10",
    },
  },
  customData: {
    title: "Reporte de Pruebas E2E - Sistema ADL",
    data: [
      {
        label: "Proyecto",
        value: "Sistema ADL - Pruebas de Autenticación y Productos",
      },
      { label: "Fecha de Ejecución", value: new Date().toLocaleString() },
      { label: "Ambiente", value: "https://test-adl.leonardojose.dev" },
    ],
  },
});

console.log("✅ Reporte de Cucumber generado exitosamente");
