import './style.styl';
import React, { useEffect, useState } from 'react';
import {
    HashRouter, Link, Route, Switch, Redirect, useLocation
} from 'react-router-dom';
import Routes from 'docs/routes';
import Log from 'docs/pages/log';
import Footer from '../layout/Footer';

const routes = Routes();
const DoubleUI = () => {
    const { pathname } = useLocation();
    const [active, setActive] = useState('/log');
    useEffect(() => {
        const path = pathname.split('/')[2];
        setActive(`/${path}`);
    }, [pathname]);

    return (
        <div className="dui">
            <HashRouter basename="/double-ui">
                <div className="dui-menu">
                    <Link className={['dui-menu-item', active === '/log' && 'dui-menu-active'].join(' ')} to="/log">Log</Link>
                    {
                        routes.map(({ id, path, name }) => (
                            <Link key={id} className={['dui-menu-item', active === path && 'dui-menu-active'].join(' ')} to={path}>{name}</Link>
                        ))
                    }
                </div>
                <div className="dui-main">
                    <Switch>
                        <Route path="/log" component={Log} />
                        {
                            routes.map(({ id, path, component: Component }) => (
                                <Route
                                    key={id}
                                    path={path}
                                    component={Component}
                                />
                            ))
                        }
                        <Redirect to="/log" />
                    </Switch>
                    <Footer />
                </div>
            </HashRouter>
        </div>
    );
};

export default DoubleUI;
