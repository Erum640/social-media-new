
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Searchbar.css"
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://social-media-backend-venv.onrender.com/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  // new code added
  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  return (
    <div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for users..."
          value={query}
          // onChange={(e) => setQuery(e.target.value)}
          onChange={handleChange}
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

            {}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
