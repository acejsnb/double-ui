import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Modules } from 'docs/utils/routes';

type Props = {
    routes: Modules[]
}
const Layout: FC<Props> = ({ routes }) => (
    <div className="docs-layout">
        {
            routes.map((route) => (
                <Link key={route.id} to={route.path}>{route.name}</Link>
            ))
        }
    </div>
);

export default Layout;
