import './assets/stylus/base.styl';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('double-ui')
);
