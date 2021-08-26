import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const toHome = () => {
        history.push('/layout');
    };
    return (
        <div className="docs-home">
            <button onClick={toHome}>start</button>
        </div>
    );
};

export default Home;
