import React from 'react';
import {
    HashRouter, Link, Route, Switch, Redirect
} from 'react-router-dom';
import { BlogRoutes } from 'docs/routes';

const routes = BlogRoutes();
const Blog = () => (
    <HashRouter basename="/blog">
        <Switch>
            {
                routes.map(({ id, path, component }) => (
                    <Route key={id} path={path} component={component} />
                ))
            }
            <Redirect to={routes[0].path} />
        </Switch>
    </HashRouter>
);

export default Blog;
