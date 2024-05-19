import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/teams"></Link></li>
                    <li><Link to="/type"></Link></li>
                    <li><Link to="/search"></Link></li>
                </ul>
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
                        {pokemonTypes.map((type, index) => (
                            <li key={index}>{type.name}</li>
                        ))}
                    </ul>
                </span>
            </div>
        </div>
    )
};

export default Home;