import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import store from './store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Connecting redux to our application */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
