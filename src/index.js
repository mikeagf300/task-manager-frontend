import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar desde 'react-dom/client'
import './index.css'
import App from './App';

// Usar createRoot en lugar de render
const root = ReactDOM.createRoot(document.getElementById('root')); // Crea la raíz de la aplicación
root.render(<App />); // Renderiza la aplicación

