import React, { useEffect, useState } from 'react';
import '../../App.css';
import './Home.css';
import CardOwned from '../CardOwned';

function PokemonOwned() {

    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);

    const parsePokemeon = () => {
        const tmp_result = localStorage.getItem('list_pokemon');
        const result = JSON.parse(tmp_result)

        if (result.length > 0) {
            setIsEmpty(false)
        }
        setData(result)
    }

    useEffect(() => {
        parsePokemeon()
    }, [])

    const releasePokemon = (el) => {
        const result = data.find(d => el === d);
        if(!result) return alert(`Oops! Data doesn't exist`);
        let updatedListPokemon = [...data];
        updatedListPokemon.splice(updatedListPokemon.indexOf(result, 1))
        localStorage.setItem('list_pokemon', JSON.stringify(updatedListPokemon));
        setData(updatedListPokemon);
        if(updatedListPokemon.length === 0 ) setIsEmpty(true)
    }
    return (
        <>
            <div className='home-container'>
                {isEmpty ? <div className="home-quotes">
                    <h1>Oops! You didn't have Pokemon!</h1>
                    <p>Let's Catch it!</p>
                </div> : null}
                <div className="pokemon-container">
                    {data.map(el => 
                        <CardOwned data={el} onClick={releasePokemon}  />
                        )}
                </div>
            </div>
        </>
    )
}

export default PokemonOwned;