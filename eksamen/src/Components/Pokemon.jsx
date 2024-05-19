import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react';
import axios from 'axios';

const Pokemon = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}/`);
                setPokemon(response.data);
                setError('');
            } catch (error) {
                console.error("Error fetching Pokémon data");
                setPokemon(null);
                setError('Pokémon not found');
            }
        };
        fetchPokemon();
    }, [name]);

    return (
        <article>
            {pokemon ? (
                <span>
                    <h2>{pokemon.name}</h2>
                </span>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
};

export default Pokemon;