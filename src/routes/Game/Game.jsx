
import axios from 'axios'; 
import React, { useEffect, useState} from 'react';
import style from './Game.module.css';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';


export default function Game(){

    const [input, setInput] = useState('')
    const [success, setSuccess] = useState(false)
    const [game, setGame] = useState(false)
    const [allPokemons, setAllPokemons] = useState([]);
    const [chosenPokemons, setChosenPokemons] = useState([]);
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
    const [pokeOptions, setPokeOptions] = useState([])
    // console.log(myPokemon[0] ? myPokemon[0].name : 'no hay nombre')


    useEffect( () => {
        const grabData = async () => {
            const { data } = await axios(baseURL)
            const { results } = data
           
       return Promise.all(
            results.map( async (pokeData) => {
            const pokemon = await axios(pokeData.url);
            //si el id es mayor a 100, me tengo q traer una imagen de la api
            
            return pokemon
            })
        )
        }
        grabData()
            .then(data => {
           // console.log(data)
            setAllPokemons(data)
            setChosenPokemons(allPokemons)
        })
    }, [])


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
    

     const initGame = useMemo(()=>{

        for(let i = 0; i < 4; i++){
            let indexRandom = getRandomInt(0, chosenPokemons.length) ;
            let poke = chosenPokemons.splice(indexRandom, 1);
            console.log(poke)
            setPokeOptions(prevState => [...prevState, poke])
    }
        return pokeOptions
     },[allPokemons])
    
     console.log(initGame)

    



    return(
        <div className={style.game}>
            <Link to='/home' style={{textDecoration: 'none'}} className={style.home}><button className={style.button}><img  alt="pokebola" width='20px'/> Home</button></Link>
            <img  className={style.logo}alt="pokebola" width='540px'/>
            
            <div className={style.header}>
              <button className={style.reload}><img src='images/cards/reload.svg' alt="pokebola" width='40px'/></button>
              <img  className={style.bkg} alt="pokebola" width='580px'/>
              {
                allPokemons.length ?
                <img  style={ game ? {filter: 'grayscale(0) brightness(100%)'} : {}} className={style.img} alt="Pokemon" width='220px'/> :
                <img  className={style.img} alt="Loading game" width='220px'/>
              }
              <span className={style.introduction}>Test your knowledge with this guess Pokemon game!</span>
              <form  className={style.form}>
                  <input 
                    type='text' 
                    
                    value={input} 
                    name='repeat'
                    autocomplete="off"
                    placeholder="Pokemon name..."
                  />
                  <button type='submit'>Send</button>
              </form>
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








