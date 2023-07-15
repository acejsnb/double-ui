import '@/assets/stylus/app.styl';
import React from 'react';
import {
    HashRouter, Route, Routes
} from 'react-router-dom';

import Home from './pages/Home';
import routes, { RouteItem } from './routes';

function App() {
    return (
        <div className="app">
            <h1 className="title">double-ui</h1>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {
                        routes.map(({ name, path, component: Component }: RouteItem) => (
                            <Route key={name} path={path} element={<Component />} />
                        ))
                    }
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
