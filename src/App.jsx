import { useState, useEffect } from 'react'
import PokeSearch from './PokeSearch'

function App() {

  const [pokeDex, setPokeDex] = useState(null)
  const [pokeName, setPokeName] = useState("Search Cobblemon")
  const [infoBox, setInfoBox] = useState(false);
  const [selectedData, setSelectedData] = useState([])

  useEffect(() => {
    fetch('/cobblemon_grouped.json')
      .then(res => res.json())
      .then(data => setPokeDex(data));
  }, []);

  useEffect(() => {
    if (pokeDex && pokeName !== "Search Cobblemon") {
      const data = pokeDex[pokeName] ?? [];
      setSelectedData(data);
    } else {
      setSelectedData([]);
    }
  }, [pokeDex, pokeName]);

  function openInfoBox() {
    if (pokeName === "Search Cobblemon") {
      alert("please select a cobblemon to use")
      return
    }
    setInfoBox(prev => !prev)
  }

  return (
    <div className='page-content'>
      <h1 className='header'>Cobblemon Spawn Helper App</h1>
      <h3>Find where all available cobblemon can spawn!</h3>
      <div className='page-body'>
        <div className='search-container'>
          <div className='poke-card'>
            <h2 className='poke-name'>{pokeName}</h2 >
            <img className='poke-img' src={`https://img.pokemondb.net/sprites/home/normal/${pokeName.toLowerCase()}.png`} alt={pokeDex && pokeName !== "Search Cobblemon" ? pokeName : ""} />
          </div>
          <div className='search-functions'>
            <PokeSearch pokeDex={pokeDex} pokeName={setPokeName}/>
            <button className='poke-confirm' onClick={openInfoBox}>Confirm Search</button>
          </div>
        </div>
        {infoBox && (
          <div className="info-box">
            <h3>Spawn Info for {pokeName}</h3>
            {selectedData.length > 0 ? (
              <ul>
                {selectedData.map((entry, index) => (
                  <li key={index} style={{ marginBottom: '1rem' }}>
                    <strong><a href='https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Spawning/Spawn_Definitions' target='_blank'>Biome(s)</a>:</strong> {entry.Biomes || 'Unknown'} <br />
                    <strong>Time:</strong> {entry.Time || 'Any'} <br />
                    <strong>Weather:</strong> {entry.Weather || 'Any'} <br />
                    <strong>Rarity:</strong> {entry.Bucket || 'Unknown'} <br />
                    <strong>Multipliers:</strong> {entry.Multipliers || 'None'} <br />
                    <strong>Levels:</strong> {entry["Lv. Min"]} - {entry["Lv. Max"]}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No spawn data available for this Pokémon.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
