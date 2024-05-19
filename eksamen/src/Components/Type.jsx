import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        <div>
            {typeDetails ? (
                <>
                    <h1>{typeDetails.name}</h1>
                    <ul>
                        {typeDetails.pokemon.map((pokemonEntry, index) => (
                            <li key={index}>{pokemonEntry.pokemon.name}</li>
                        ))}
                </ul>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Type;