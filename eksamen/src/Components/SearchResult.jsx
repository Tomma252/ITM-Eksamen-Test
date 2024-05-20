import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResult = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const fetchPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            setResults([response.data]);
            setError('');
        } catch (error) {
            console.error('Pokémon not found.');
            setResults([]);
            setError('Pokémon not found.');
        }
    };

    const fetchAbilityDescription = async (abilityUrl) => {
        try {
            const response = await axios.get(abilityUrl);
            const effectEntries = response.data.effect_entries;
            const englishEntry = effectEntries.find(entry => entry.language.name === 'en');
            return englishEntry ? englishEntry.effect : 'No description available.';
        } catch (error) {
            console.error('Error fetching ability description.', error);
            return 'No description available.';
        }
    };

    const handleSearch = async () => {
        if (search.trim() !== '') {
            await fetchPokemon();
        }
    };

    useEffect(() => {
        if (results.length > 0 && results[0].abilities && !results[0].abilities[0].description) {
            const fetchDescriptions = async () => {
                const abilities = results[0].abilities;
                const descriptions = await Promise.all(
                    abilities.map(async (ability) => ({
                        name: ability.ability.name,
                        description: await fetchAbilityDescription(ability.ability.url)
                    }))
                );
                setResults([{ ...results[0], abilities: descriptions }]);
            };
            fetchDescriptions();
        }
    }, [results]);

    return (
        <article>
            <h2>Search for a Pokémon</h2>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {results.length > 0 && results.map((pokemon, index) => (
                <div key={index}>
                    <h3>{pokemon.name.toUpperCase()}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>TYPE(S)</h3>
                    <p>
                        {pokemon.types.map((type, index) => (
                            <span key={index}>
                                {type.type.name}{index < pokemon.types.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </p>
                    <h3>ABILITIES</h3>
                    {pokemon.abilities.map((ability, index) => (
                        <section key={index}>
                            <h4>{ability.name}</h4>
                            <p>{ability.description}</p>
                        </section>
                    ))}
                    <h3>STATS</h3>
                    <ul>
                        {pokemon.stats.map((stat, index) => (
                            <li key={index}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </article>
    );
};

export default SearchResult;
