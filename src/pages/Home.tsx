import React from 'react';
import { Link } from 'react-router-dom';
import routes, { routerProps } from '../utils/routes';

const Home = () => (
    <>
        {
            routes.map((d: routerProps) => (
                <section className="route-link" key={d.name}>
                    <Link to={d.path}>{d.name}</Link>
                </section>
            ))
        }
    </>
);

export default Home;
