import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../App.css';
import './Home.css';
import Card from '../Card';

function Home() {

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
    const [data, setData] = useState([]);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    let listPokemon = [];

    const fetchData = async (url) => {
        listPokemon = JSON.parse(localStorage.getItem('list_pokemon'));
        if(!listPokemon) {
            localStorage.setItem('list_pokemon', JSON.stringify([]))
            listPokemon = [];
        } 
        const tmpData = await axios(url)
        const items = tmpData.data.results;
        const results = await Promise.all(items.map(async (el) => {
            const imageurl = await getImage(el.url);
            el.imageurl = imageurl;

            //get existing pokemon
            const listOwned = listPokemon.filter(e => e.pokemonType === el.name);
            el.owned = listOwned.length;
            return el;
        }))
        setData(results);
        setNext(tmpData.data.next)
        setPrevious(tmpData.data.previous)
        window.scrollTo({top: 0, behavior:'smooth'})
    }

    useEffect(() => {
        fetchData(url);
    }, [])

    const getImage = async (url) => {
        const response = await axios(url)
        return response.data.sprites.other.dream_world.front_default;
    }

    const onNext = () => {
        fetchData(next)
    }

    const onPrev = () => {
        fetchData(previous)
    }

    return (
        <>
            <div className="home-container">
                <div className="home-quotes">
                    <h1>Catch Your Pokemon</h1>
                    <p>Let's GO!</p>
                </div>
                <div className="pokemon-container">
                    {data.map(el => <Card name={el.name} image={el.imageurl} key={el.url} url={el.url} owned={el.owned} />)}
                </div>
                <div className="pagination-container">
                    <button className="button-pagination" onClick={onPrev} disabled={!previous}>Prev</button>
                    <button className="button-pagination" onClick={onNext} disabled={!next}>Next</button>
                </div>
            </div>

        </>
    )
}

export default Home;