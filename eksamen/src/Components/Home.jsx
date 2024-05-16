import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <article>
            <h1></h1>
            <nav>
                <ul>
                    <li><Link to="/teams">Teams</Link></li>
                    <li><Link to="/type">Type</Link></li>
                    <li><Link to="/search">Search</Link></li>
                </ul>
            </nav>
        </article>
    );
};

export default Home;