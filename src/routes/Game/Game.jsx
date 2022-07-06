
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './Game.module.css';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import pokedex from '/images/pokedex.png';
import palanding from '/images/palanding.png';
import Loading from '/images/pokeLoading.gif';
import gamelogo from '/images/gamelogo.png';
import gamegif from '/images/gamegif.gif';
import background from '/images/pokemongame.png';
import Navbar from '../../components/Navbar/Navbar';
import reload from '/images/reload.svg';

export default function Game() {

    const [input, setInput] = useState('')
    const [success, setSuccess] = useState(true)
    const [game, setGame] = useState(false)
    const [allPokemons, setAllPokemons] = useState([]);
    const [chosenPokemons, setChosenPokemons] = useState([]);
    const [pokeOptions, setPokeOptions] = useState([]);
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    //const [pokeOptions, setPokeOptions] = useState([])
    // console.log(myPokemon[0] ? myPokemon[0].name : 'no hay nombre')


    const actualizar = () => {

        let pokeSorted = []
        console.log("all pk",allPokemons)
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        for(let i = 0; i < 4; i++){
            //chosenPokemons.length
            let indexRandom = getRandomInt(0, 148) ;

            //let poke = chosenPokemons.filter(indexRandom, 1);
            
            const { 0: poke } = allPokemons.filter((poke) => poke.data.id === indexRandom);
            
            pokeSorted.push(poke)
            
        }
           
        setPokeOptions(pokeSorted)



}



useEffect(() => {
    console.log("entro al useEffect")
    
    if(!allPokemons.length){
        console.log("entro al 1er if")
        
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
                            setAllPokemons(data)
                            setChosenPokemons(prevState => [prevState, ...allPokemons])
                        })
    }
        
    if(!pokeOptions.length && allPokemons.length) {
        console.log("entro al 2do if")
                actualizar()
    }

}, [allPokemons ])


    //pokeOptions[0].data.sprites.other.home.front_default
  console.log(pokeOptions)

    return (
        <div className={style.game}>

            
         

    <div className={style.game}>
            <Link to='/home' style={{textDecoration: 'none'}} className={style.home}><button className={style.button}><img src={palanding} alt="palanding" width='80px'/></button></Link>
          
            
            <div className={style.header}>
              <button  onClick={(e) => handleReload(e)} className={style.reload}><img src={reload} alt="pokebola" width='40px'/></button>
              <img src={background} className={style.bkg} alt="pokebola" width='580px'/>
              {
                pokeOptions.length ?
                <img src={pokeOptions[0].data.sprites.other.home.front_default} style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> :
                <img src={gamegif} style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> 
            
              }
              <span className={style.introduction}>  <img src={gamelogo} alt="pokebola" width='300px'/>
              

              {
                pokeOptions.length ?
                <div className={style.options}>
                        <button > {pokeOptions[0].data.name.toUpperCase()} </button>
                        <button > {pokeOptions[1].data.name.toUpperCase()} </button>
                        <button > {pokeOptions[2].data.name.toUpperCase()} </button>
                        <button > {pokeOptions[3].data.name.toUpperCase()} </button>
                </div>
                 :
                <div></div>
            
              }

              
                
                </span>
            
              {
                  game ? 
                  success ?
                  <div className={style.result}>
                      Correct! This pokemon is 
                  </div> :
                  <div className={style.result}>
                      Oops! Incorrect. This pokemon is
                  </div>
                  :
                  <div></div>
              }
            </div>
        </div>
                        
        </div>
    )
}








