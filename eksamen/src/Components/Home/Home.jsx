import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

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
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <h1>MAIN POKÉMONS</h1>
                <div className={styles.pokemonGrid}>
                    {pokemonList.map((pokemon, index) => (
                        <div key={index} className={styles.pokemonCard}>
                            <p>{pokemon.name}</p>
                        </div>
                    ))}
                </div>
                <section className={styles.typeSection}>
                    <h3>TYPES</h3>
                    <ul className={styles.typeList}>
                        {filteredTypes && filteredTypes.map((type, index) => (
                            <li key={index} className={`${styles.typeItem} ${styles.typeCard}`}>
                                <Link to={`/type/${type.name}`}>{type.name}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Home;
