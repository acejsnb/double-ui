import './public/base.styl';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

createRoot(document.getElementById('double-ui-docs')!).render(<App />);
