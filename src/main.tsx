import './assets/stylus/variables.styl';
import './assets/stylus/main.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('double-ui')
);
