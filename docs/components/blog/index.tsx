import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Modules } from 'docs/routes/types';

interface Props {
    routes: Modules[]
}
const Index: FC<Props> = ({ routes }) => (
    <div className="blog-list">
        {
            routes.map(({ id, path, name }) => (
                <Link key={id} className="blog-menu-item" to={path}>{name}</Link>
            ))
        }
    </div>
);

export default Index;
