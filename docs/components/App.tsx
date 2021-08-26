import 'docs/public/app.styl';
import React from 'react';
import {
    HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import Home from 'docs/components/Home';
import Layout from 'docs/components/Layout';
import Routes from 'docs/utils/routes';

const routes = Routes();
const App = () => (
    <div className="docs-app">
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/layout" render={() => <Layout routes={routes} />} />
                {
                    routes.map(({ id, path, component: Component }) => (
                        <Route key={id} path={path} render={() => <Component />} />
                    ))
                }
                <Redirect to="/" />
            </Switch>
        </HashRouter>
    </div>
);

export default App;
