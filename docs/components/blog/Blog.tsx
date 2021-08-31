import './style.styl';
import React from 'react';
import {
    HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import { BlogRoutes } from 'docs/routes';
import Index from './index';

const routes = BlogRoutes();
const Blog = () => (
    <div className="blog">
        <HashRouter basename="/blog">
            <Switch>
                <Route path="/index" render={() => <Index routes={routes} />} />
                {
                    routes.map(({ id, path, component }) => (
                        <Route key={id} path={path} component={component} />
                    ))
                }
                <Redirect to="/index" />
            </Switch>
        </HashRouter>
    </div>
);

export default Blog;
