import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './Pokemon.module.scss';

const SearchResult = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();

    const fetchPokemon = async (search) => {
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
            return englishEntry ? {
                effect: englishEntry.effect,
                short_effect: englishEntry.short_effect
            } : {
                effect: 'No description available.',
                short_effect: 'No description available.'
            };
        } catch (error) {
            console.error('Error fetching ability description.', error);
            return {
                effect: 'No description available.',
                short_effect: 'No description available.'
            };
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query') || '';
        if (query.trim() !== '') {
            fetchPokemon(query);
        }
    }, [location]);

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
            {error && <p>{error}</p>}
            {results.length > 0 && results.map((pokemon, index) => (
                <div className={styles.pokemon} key={index}>
                    <h3 className={styles['pokemon__name']}>{pokemon.name.toUpperCase()}</h3>
                    <img className={styles['pokemon__image']} src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                    <h3 className={styles['pokemon__types']}>TYPE(S)</h3>
                    <p className={styles['pokemon__types']}>
                        {pokemon.types.map((type, index) => (
                            <span key={index}>
                                {type.type.name}{index < pokemon.types.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </p>
                    <h3 className={styles['pokemon__abilities']}>ABILITIES</h3>
                    {pokemon.abilities.map((ability, index) => (
                        <section className={styles['pokemon__abilities']} key={index}>
                            <h4 className={styles['pokemon__abilities-name']}>{ability.name}</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={styles['pokemon__abilities-description']}>Effect: {ability.description ? ability.description.effect : 'No description available.'}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles['pokemon__abilities-description']}>Short Effect: {ability.description ? ability.description.short_effect : 'No description available.'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        ))}
                    <h3 className={styles['pokemon__stats']}>STATS</h3>
                    <ul className={styles['pokemon__stats']}>
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