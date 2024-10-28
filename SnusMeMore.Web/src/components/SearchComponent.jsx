import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        if (!response.ok) {
        }
        const data = await response.json();
        setResults(data);
        setShowDropdown(data.length > 0);
      } catch (error) {
      }
    };

    
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300); 

    return () => clearTimeout(delayDebounceFn); 
  }, [searchTerm]);

  const handleResultClick = (result) => {
    navigate(`/snus/${result.id}`);
    setSearchTerm(''); 
    setShowDropdown(false); 
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Skriv din sökterm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      {showDropdown && results.length > 0 && (
        <div className="dropdown-results">
          <ul>
            {results.map((result) => (
              <li key={result.id} onClick={() => handleResultClick(result)}>
                <h3>{result.snusName}</h3>
                <img src={result.imageUrl} alt={result.snusName} />
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
