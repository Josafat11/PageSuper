import React from 'react';
import { createRoot } from 'react-dom'; // Importa createRoot en lugar de ReactDOM
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UseContext';

// Importación de la librería para BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 

createRoot(document.getElementById('root')).render( // Utiliza createRoot en lugar de ReactDOM.render
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Envolver la aplicación con UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
