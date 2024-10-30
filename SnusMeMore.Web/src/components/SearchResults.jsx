import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/CSS/master.css";

const SearchResults = () => {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

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

    const handleCardClick = (result) => {
        navigate(`/productpage?snusName=${encodeURIComponent(result.snusName)}`);
    };


    return (
        <div className="results-page">
            <h2>Sökresultat för "{query}"</h2>
            {results.length === 0 ? (
                <p>Inga resultat hittades.</p>
            ) : (
                <div className="results-container">
                    {results.map((result) => (
                        <div
                            key={result.id}
                            className="result-card"
                            onClick={() => handleCardClick(result)}
                            style={{ cursor: 'pointer' }}
                        >
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
