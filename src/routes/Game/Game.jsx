
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './Game.module.css';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import pokedex from '/images/pokedex.png';
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
            console.log(pokeSorted)
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



  console.log(pokeOptions)

    return (
        <div className={style.game}>

            
            {pokeOptions.length === 0 ? (
                <h3>
                    <img src={Loading} className={style.loading} alt="Loading..." />
                </h3>
            ) : (
                

    <div className={style.game}>
            <Link to='/home' style={{textDecoration: 'none'}} className={style.home}><button className={style.button}><img  alt="pokebola" width='20px'/> Home</button></Link>
            <img src={gamelogo} className={style.logo}alt="pokebola" width='540px'/>
            
            <div className={style.header}>
              <button  onClick={(e) => handleReload(e)} className={style.reload}><img src={reload} alt="pokebola" width='40px'/></button>
              <img src={background} className={style.bkg} alt="pokebola" width='580px'/>
              {
                <img src={gamegif} style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> 
            
              }
              <span className={style.introduction}>Test your knowledge with this guess Pokemon game!
              
              <div className={style.options}>
                        <button > {pokeOptions[0].data.name} </button>
                        <button > {pokeOptions[1].data.name} </button>
                        <button > {pokeOptions[2].data.name} </button>
                        <button > {pokeOptions[3].data.name} </button>
                    </div></span>
            
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
               
        
                
                

            )



            }
        </div>
    )
}








