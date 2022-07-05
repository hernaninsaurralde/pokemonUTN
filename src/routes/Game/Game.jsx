
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './Game.module.css';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import pokedex from '/images/pokedex.png';
import Loading from '/images/pokeLoading.gif';


export default function Game() {

    const [input, setInput] = useState('')
    const [success, setSuccess] = useState(false)
    const [game, setGame] = useState(false)
    const [allPokemons1, setAllPokemons1] = useState([]);
    const [chosenPokemons, setChosenPokemons] = useState([]);
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
    //const [pokeOptions, setPokeOptions] = useState([])
    // console.log(myPokemon[0] ? myPokemon[0].name : 'no hay nombre')


    useEffect(() => {
       
        const grabData = async () => {
            const { data } = await axios(baseURL)
            const { results } = data
            return Promise.all(
                results.map(async (pokeData) => {
                    const pokemon = await axios(pokeData.url);
                    return pokemon
                })
            )
        }
        grabData()
            .then(data => {
                 console.log('tiene que entea 1 vez')
                setAllPokemons1(data)
                setChosenPokemons(allPokemons1)
            })
    }, [])


    console.log("allpokemon", allPokemons1)

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    
    useEffect(() => {
        console.log('entra use effect')
        
            let pokeOptions = []
            
            for(let i = 0; i < 4; i++){
                //chosenPokemons.length
                let indexRandom = getRandomInt(0, 10) ;
                let poke = chosenPokemons.splice(indexRandom, 1);
                console.log("poke", poke)
                pokeOptions.push(...poke)
            }

        console.log(pokeOptions)
    }, [chosenPokemons]) 

    


    // USE MEMO--------------------------------------
    /*
         const pokeOptions = useMemo(()=>{
            let pokeOptions = []
            console.log("all pk",allPokemons1)

            for(let i = 0; i < 4; i++){
                //chosenPokemons.length
                let indexRandom = getRandomInt(0, 10) ;
                let poke = chosenPokemons.splice(indexRandom, 1);
                console.log("poke", poke)
                pokeOptions.push(...poke)
        }
            return pokeOptions
         },[allPokemons1])
    
         console.log(pokeOptions)
        */

    return (
        <div className={style.game}>

            {pokeOptions.length === 0 ? (
                <h3>
                    <img src={Loading} className={style.loading} alt="Loading..." />
                </h3>
            ) : (
                <>
                    <h1> {pokeOptions[0].data.name} |</h1>
                    <h1> {pokeOptions[1].data.name} |</h1>
                    <h1> {pokeOptions[2].data.name} |</h1>
                    <h1> {pokeOptions[3].data.name} |</h1>
                </>




            )



            }
        </div>
    )
}








