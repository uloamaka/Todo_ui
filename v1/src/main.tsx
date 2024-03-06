import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { TodoProvider } from './context/TodoProvider.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <TodoProvider>
        <ChakraProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChakraProvider>
      </TodoProvider>
  </BrowserRouter>,
);
