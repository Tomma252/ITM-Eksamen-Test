import React, { useState } from 'react';
import axios from 'axios';

const SearchResult = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            setResults([response.data]);
            setError('');
        } catch (error) {
            console.error('Pokémon not found');
            setResults([]);
            setError('Pokémon not found');
        }
    };

    return (
        <article>
            <h2>Search for a Pokémon</h2>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <span>
                {results.length > 0 && results.map((pokemon, index) =>(
                    <div key={index}>
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </span>
        </article>
    );
};

export default SearchResult;