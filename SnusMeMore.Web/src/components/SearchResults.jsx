import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/CSS/master.css";

const SearchResults = () => {
    const { query } = useParams();  
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`https://localhost:44311/api/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                console.log('Search Results:', data); 
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <div className="results-page">
            <h2>Sökresultat för "{query}"</h2>
            {results.length === 0 ? (
                <p>Inga resultat hittades.</p>
            ) : (
                <div className="results-container">
                    {results.map((result) => (
                        <div key={result.id} className="result-card">
                            <img src={result.imageUrl} alt={result.snusName} className="result-image" />
                            <span className="result-name">{result.snusName}</span>
                            <span className="result-price">Pris: {result.price} kr</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
