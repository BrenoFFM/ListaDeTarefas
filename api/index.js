// Arquivo de entrada para o Vercel
// Este arquivo exporta a aplicação Express para o Vercel usar como serverless function

const app = require('../backend/src/app');

// Exporta o app para o Vercel
module.exports = app;
