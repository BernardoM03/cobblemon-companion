import { useState, useEffect } from 'react'
import PokeSearch from './PokeSearch'

function App() {

  const [pokeDex, setPokeDex] = useState(null)
  const [pokeName, setPokeName] = useState("Search Cobblemon")

  useEffect(() => {
    fetch('/cobblemon_grouped.json')
      .then(res => res.json())
      .then(data => setPokeDex(data));
  }, []);

  return (
    <div className='page-content'>
      <h1 className='header'>Cobblemon Dex</h1>
      <div className='poke-card'>
        <h2 className='poke-name'>{pokeName}</h2 >
      </div>
      <PokeSearch pokeDex={pokeDex}/>
    </div>
  )
}

export default App
