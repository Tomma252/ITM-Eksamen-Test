import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchResult from './Pokemon';

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
                const results = response.data.results;

                const detailedPokemonList = await Promise.all(
                    results.map(async (pokemon) => {
                        const pokemonDetails = await axios.get(pokemon.url);
                        return pokemonDetails.data;
                    })
                );

                setPokemonList(detailedPokemonList);
            } catch (error) {
                console.error("Error fetching Pokémon list.", error);
            }
        };

        const fetchPokemonTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');
                setPokemonTypes(response.data.results);
            } catch (error) {
                console.error("Error fetching Pokémon types.")
            }
        }

        fetchPokemonList();
        fetchPokemonTypes();
    }, []);

    const filteredTypes = pokemonTypes.filter(type => type.name !== "stellar" && type.name !== "unknown");

    return (
        <div>
            <nav>
                <SearchResult></SearchResult>
            </nav>
            <div>
                <h2>MAIN POKÉMONS</h2>
                <div>
                    {pokemonList.map((pokemon, index) => (
                        <span key={index}>
                            <p>{pokemon.name}</p>
                        </span>
                    ))}
                </div>
                <span>
                    <h3>TYPES</h3>
                    <ul>
                        {filteredTypes && filteredTypes.map((type, index) => (
                            <li key={index}>
                                <Link to={`/type/${type.name}`}>{type.name}</Link>
                            </li>
                        ))}
                    </ul>
                </span>
            </div>
        </div>
    )
};

export default Home;