import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/CSS/master.css";

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm.length < 1) {
                setResults([]);
                setShowDropdown(false);
                return; 
            }
            try {
                const response = await fetch(`https://localhost:44311/api/search?query=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setResults(data);
                setShowDropdown(data.length > 0);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        // Debounce for input
        const delayDebounceFn = setTimeout(() => {
            fetchResults();
        }, 300); 
        return () => clearTimeout(delayDebounceFn); 
    }, [searchTerm]);

    const handleResultClick = (result) => {
        navigate(`/productpage?snusName=${encodeURIComponent(result.snusName)}`);
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
        setShowDropdown(false);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearchSubmit} aria-label="Search form">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    aria-label="Search for snus products"
                    aria-expanded={showDropdown}
                    aria-haspopup="listbox"
                    role="combobox"
                />
            </form>
            {showDropdown && results.length > 0 && (
                <div className="dropdown-results" role="listbox">
                    <ul>
                        {results.map((result) => (
                            <li
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                tabIndex={0}
                                role="option"
                                aria-selected="false"
                                onKeyDown={(e) => e.key === 'Enter' && handleResultClick(result)}
                            >
                                <h3>{result.snusName}</h3>
                                <img src={result.imageUrl} alt={`Image of ${result.snusName}`} />
                                <p>Pris: {result.price} kr</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
