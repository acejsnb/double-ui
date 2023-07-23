import React from 'react';
import { Link } from 'react-router-dom';
import routes from '@/routes';

export default function Home() {
    return (
        <>
            {
                routes.map((route) => (
                    <section className="route-link" key={route.name}>
                        <Link to={route.path}>{route.name}</Link>
                    </section>
                ))
            }
        </>
    );
}
