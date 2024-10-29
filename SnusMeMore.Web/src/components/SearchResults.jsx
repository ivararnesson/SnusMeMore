import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/CSS/snuslist.css"



const SearchResults = () => {
    const { query } = useParams();  
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`https://localhost:44311/api/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <div>
            <h2>Sökresultat för "{query}"</h2>
            <ul>
                {results.map((result) => (
                    <li key={result.id}>
                        <h3>{result.snusName}</h3>
                        <img src={result.imageUrl} alt={result.snusName} />
                        <p>Pris: {result.price} kr</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
