import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(search)}`);
        }
    };

    return (
        <header>
            {/* Logo (UIN) */}
            <Link to="/" className="logo">UIN POKÉDEX</Link>

            {/* Teams link */}
            <Link to="/teams" className="teams-link">TEAMS</Link>
            
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </header>
    );
};

export default Header;
