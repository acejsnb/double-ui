import '@/assets/stylus/app.styl';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import routes from './routes';

function App() {
    return (
        <div className="app">
            <h1 className="title">double-ui</h1>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {
                        routes.map(({ name, path, element: Element }) => (
                            <Route key={name} path={path} element={Element} />
                        ))
                    }
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
