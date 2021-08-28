import './style.styl';
import React, { useState } from 'react';
import {
    HashRouter, Link, Route, Switch, Redirect, useHistory
} from 'react-router-dom';
import Routes from 'docs/routes';
import Log from 'docs/pages/log';
import Footer from '../layout/Footer';

const routes = Routes();
const basenameUI = '/double-ui';
const DoubleUI = () => {
    const history = useHistory();
    const [active, setActive] = useState('log');
    const pushHistory = (id: string, path: string) => {
        setActive(id);
        history.push(basenameUI + path);
    };
    return (
        <div className="dui">
            <HashRouter basename="/double-ui">
                <div className="dui-menu">
                    <section className={['dui-menu-item', active === 'log' && 'dui-menu-active'].join(' ')} onClick={() => pushHistory('log', '/log')}>
                        Log
                    </section>
                    {
                        routes.map(({ id, path, name }) => (
                            <section className={['dui-menu-item', active === id && 'dui-menu-active'].join(' ')} key={id} onClick={() => pushHistory(id, path)}>
                                {name}
                            </section>
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
