// src/App.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Searchbar.css"
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          Search
        </button>

      </div>
      <div>
        {results.map((user) => (
          <div key={user._id}>
            <h3>

              <Link to={`/profile/${user._id}`}>{user.name}</Link>

            </h3>

            {/* Display other user fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
