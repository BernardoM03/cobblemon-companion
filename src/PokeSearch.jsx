import React, { useState, useEffect } from 'react';

export default function PokeSearch({ pokeDex }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!pokeDex || query.trim() === '') {
      setFiltered([]);
      return;
    }

    const lower = query.toLowerCase();
    const matches = Object.keys(pokeDex).filter(name =>
      name.toLowerCase().includes(lower)
    );
    setFiltered(matches.slice(0, 5)); // limit to top 10 results
  }, [query, pokeDex]);

  const handleSelect = (name) => {
    setQuery(name);
    setFiltered([]);
  };

  return (
    <div className='poke-search'>
      <input type="text" placeholder="Search Pokémon..." value={query} onChange={(e) => setQuery(e.target.value)} />
      {filtered.length > 0 && (
        <ul>
          {filtered.map(name => (
            <li key={name} onClick={() => handleSelect(name)}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
