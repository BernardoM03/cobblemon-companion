import React, { useState, useEffect, useRef } from 'react';

export default function PokeSearch({ pokeDex, pokeName }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!pokeDex || query.trim() === '') {
      setFiltered([]);
      return;
    }

    const lower = query.toLowerCase();
    const matches = Object.keys(pokeDex).filter(name =>
      name.toLowerCase().includes(lower)
    );
    setFiltered(matches.slice(0, 5));
  }, [query, pokeDex]);

  const handleSelect = (name) => {
    setQuery(name);
    setFiltered([]);
    setIsFocused(false);
    pokeName(name);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='poke-search' ref={containerRef}>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && filtered.length > 0 && (
        <ul>
          {filtered.map(name => (
            <li key={name} onClick={() => handleSelect(name)}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
