import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styles from './Header.module.scss';

const Header = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(search)}`);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.leftContainer}>
                <Link to="/" className={styles.logo}>UIN POKÉDEX</Link>
                <Link to="/teams" className={styles.teamsLink}>TEAMS</Link>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.searchBar}>
                    <input
                        type='text'
                        placeholder='Søk etter Pokémon'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
