import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Type.module.scss';

const Type = () => {
    const { slug } = useParams();
    const [typeDetails, setTypeDetails] = useState(null);

    useEffect(() => {
        const fetchTypeDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/type/${slug}`);
                setTypeDetails(response.data);
            } catch (error) {
                console.log("Error fetching type details.", error);
            }
        };

        fetchTypeDetails();
    }, [slug]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                {typeDetails ? (
                    <>
                        <h1>{typeDetails.name}</h1>
                        <ul className={styles.typeList}>
                            {typeDetails.pokemon.map((pokemonEntry, index) => (
                                <li key={index} className={`${styles.typeItem} ${styles.typeCard}`}>
                                    {pokemonEntry.pokemon.name}
                                </li>
                            ))}
                    </ul>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Type;