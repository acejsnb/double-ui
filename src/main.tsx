import './assets/stylus/base.styl';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('double-ui')!).render(<App />);
