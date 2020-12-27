import './Pokemon-detail.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ButtonCommon from '../ButtonCommon';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function PokemonDetail(props) {

    const [data, setData] = useState(null);
    const [moves, setMoves] = useState([]);
    const [types, setTypes] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [isError, setIsError] = useState(false)
    const [textError, setTextError] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let history = useHistory();
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

    const fetchData = async (url) => {
        const id = props.match.params.id;
        const temp_data = await axios(baseUrl + id);
        const item = temp_data.data;
        setData(item);
        setTypes(item.types)
        setMoves(item.moves)

    }

    useEffect(() => {
        fetchData(props.location.url);

    }, []);

    const getProbabilities = () => {
        const result = Math.round(Math.random() * 100);
        return result;
    }

    const catchPokemon = () => {
        const probabilities = getProbabilities();
        if (probabilities <= 50) return alert('Oops you miss the Pokemon!');

        handleShow();
    }

    const handleOnSubmit = () => {
        let pokemonList = JSON.parse(localStorage.getItem('list_pokemon'));
        if(!name) {
            setIsError(true);
            setTextError('Please Insert a Name!');
            return;
        } 

        const existingName = checkExistingName(name);
        if(existingName.length > 0) {
            setIsError(true);
            setTextError('Name Has Been Taken');
            return;
        }
        
        setIsError(false);

        const newPokemon = {
            'name': name.toLowerCase(),
            'pokemonType': data.name,
            'image' : data.sprites.other.dream_world.front_default
        }
        pokemonList.push(newPokemon);
        localStorage.setItem('list_pokemon', JSON.stringify(pokemonList))
        routeChange()
    }

    const routeChange = () => {
        let path = `/`;
        history.push(path)
    }

    const checkExistingName = (name) => {
        let list = JSON.parse(localStorage.getItem('list_pokemon'));
        const result = list.filter(e => e.name === name.toLowerCase())
        return result;
    }

    return (
        <> {data? <div className="pokemon-detail-container">
        <div className="pokemon-detail-wrapper">
            <div className="pokemon-detail-image">
                <img src={data.sprites.other.dream_world.front_default} />
            </div>
            <div className="button-catch-container">
                <ButtonCommon children='Catch Pokemon' onClick={catchPokemon} />
            </div>
            <div className="pokemon-detail-info">
                <div className="pokemon-detail-info-container">
                    <div className="info-name">
                        <h3>{data.name}</h3>
                    </div>
                    <table >
                        <tbody>
                            <tr className="space">
                                <td>Types</td>
                                <td>:</td>
                                <td>
                                    <ul>
                                        {types.map(t =>
                                            <li>
                                                {t.type.name}
                                            </li>)}
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>Moves</td>
                                <td>:</td>
                                <td>
                                    <ul>
                                        {moves.map(m =>
                                            <li>
                                                {m.move.name}
                                            </li>)}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> :null}
            

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert Pokemon Name!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                            {isError? <Form.Text className="text-muted">
                                {textError}
                            </Form.Text> : null}
                            
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleOnSubmit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}
export default PokemonDetail;