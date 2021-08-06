import React from 'react';
import { Link } from 'react-router-dom';
import routes, { RouteItem } from '../routes';

const Home = () => (
    routes.map((d: RouteItem) => (
        <section className="route-link" key={d.name}>
            <Link to={d.path}>{d.name}</Link>
        </section>
    ))
);

export default Home;
