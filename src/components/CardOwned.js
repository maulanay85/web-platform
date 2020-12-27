import React from 'react';
import ButtonCommon from './ButtonCommon';
import './CardOwned.css';

function CardOwned(props) {

    const handleOnClick = () => {
        props.onClick(props.data)
    }


    return(
        <div className="card-owned-container">
            <div className="image-container">
                <img src={props.data.image} />
            </div>
            <div className="card-owned-info">
                <h3>{props.data.name}</h3>
                <p>{props.data.pokemonType}</p>
            </div>
            <div className="button-release-container">
                <ButtonCommon type='danger' children={'Release Pokemon!'} onClick={handleOnClick} />
            </div>
        </div>
    )
}

export default CardOwned;