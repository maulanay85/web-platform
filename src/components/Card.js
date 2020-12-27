import React, { useEffect, useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom'


function Card(props) {

    const [id, setId] = useState('')

    const getPokemonId = () => {
        const splittedStr = props.url.split('/');
        const pokemonId = splittedStr[splittedStr.length -2];
        setId(pokemonId)
        
    }
    useEffect(() => {
        getPokemonId()
        
    },[])

    return (
        <Link to={{
            pathname:"/detail/" + id,
            url:props.url
        }}>
            <div className="card-container">
                <div className="image-container">
                    <img src={props.image} />
                </div>
                <div className="card-info">
                    <h3>{props.name}</h3>
                    <p>Owned: {props.owned? props.owned : 0}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card;