import '@/assets/stylus/app.styl';
import React from 'react';
import {
    HashRouter, Route, Switch, Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import routes, { RouteItem } from './routes';

const App = () => (
    <div className="app">
        <h1 className="title">App</h1>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                {
                    routes.map((d: RouteItem) => (
                        <Route key={d.name} path={d.path} component={d.component} />
                    ))
                }
                <Redirect to="/" />
            </Switch>
        </HashRouter>
    </div>
);

export default App;
