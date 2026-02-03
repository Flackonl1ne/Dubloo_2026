import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithMapLoader from './AppWithMapLoader';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithMapLoader />
  </StrictMode>,
);
