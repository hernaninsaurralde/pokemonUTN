import React from 'react';
import style from './Home.module.css'
import {useEffect, useState} from 'react'
import Card from '../../components/Card/Card'
import axios from 'axios'; 
import Navbar from '../../components/Navbar/Navbar'
import Paginado from '../../components/Paginado/Paginado'
import Loading from '/images/pokeLoading.gif';
import poke from '/images/pokebola.png';

const Home = () => {
    
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
    const  [order, setOrder] = useState("normal")
    const  [sortedArray,setSortedArray] = useState([])
    const  [types, setTypes] = useState([])
    const  [name, setName] = useState("") // es lo que escribe el usuario
    const  [resultsFiltered, setResultsFiltered] = useState([]);
    const  [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const  [pageNumber, setPageNumber] = useState(1)
    const  [allPokemons, setAllPokemons] = useState([])
    //const [pokemon, setPokemon] = useState();


    // cuando inicia hace el array de tipos
    useEffect(() =>{
        const getTypes = async () => {
           
            try {
                
                const {data} = await axios("https://pokeapi.co/api/v2/type/")
                setTypes(data.results)
            } catch (e) {
                console.log(e)
            }
        }
        getTypes()
    },[])


    // cuando inicia hace el array de pokemon
    useEffect(() => {
        console.log("úna sola vez")
        const grabData = async () => {
            console.log('running the useEffect')
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
            setResultsFiltered(data)
        })
    }, [])


    // se ejecuta cuando actualiza la barra de busqueda
    useEffect(() => {
        console.log("Effect name search bar")
        if(!name){
            console.log("no hay name")
            if(sortedArray.length === 0){
                setResultsFiltered(allPokemons)
            } else{
                console.log("aca cambie el filtro papa")
                setResultsFiltered(sortedArray)
            }  

        }else{
            let laData = []
            console.log("HAY NAME")
            laData = resultsFiltered.filter( (poke) =>   poke.data.name.includes(name)) 
            setResultsFiltered(laData)
        }
    },[name])
    

    // Entra cuando cambia el orden
    useEffect(() => {
        console.log("Effect order")
        let sorted
        switch (order) {
            case 'normal': 
                        console.log("ID")
                        sorted = resultsFiltered.sort((a,b) => {
                        if(a.data.id > b.data.id){
                            return 1;
                        }
                        if(b.data.id > a.data.id){
                            return -1;
                        }
                        return 0;
                        })
                    break;
            case 'asc': 
                        
                        console.log("ASC")
                        sorted = resultsFiltered.sort((a,b) => {
                        if(a.data.name > b.data.name){
                            return 1;
                        }
                        if(b.data.name > a.data.name){
                            return -1;
                        }
                        return 0;
                        })
                        
                break;
            case 'desc':
                console.log("DESC")
                        sorted = resultsFiltered.sort((a,b) => {
                        if(a.data.name > b.data.name){
                            return -1;
                        }
                        if(b.data.name > a.data.name){
                            return +1;
                        }
                        return 0;
                        })      
                    
                break;
                default:
                    break;
        }
        setSortedArray(sorted)
       setResultsFiltered(sorted)
        console.log(resultsFiltered)
    },[order])
    


    //averiguar como poner el valor de ordenamiento en normal y el de typos en alltypes
    function reloadAll  ()  {
        console.log('3')
        setName("")
        handleFilterByType("All")
        setOrder('normal')
        setSortedArray(allPokemons)
        setResultsFiltered(allPokemons)
    }

    function handleFilterByType (e) {
        console.log('çambio type')
        if(e === "All"){
            //averiguar como poner el valor del input de ordenamiento o sort en value = "normal"
            setResultsFiltered(allPokemons)
        }else{
            const filterByType = allPokemons.filter(poke => {
            
                return  poke.data.types[0].type.name.includes(e)
           }
           )
           setResultsFiltered(filterByType)
        }
    }

    const handleSort = (e) => {
        
        switch(e.target.value){
            case 'normal': setOrder('normal')
            break;
            case 'asc': setOrder('asc')
            break;
            case 'desc': setOrder('desc')
            break;
            default :
            break;
        }
    }


    function goToNumber (num) {
        const offset = (num*20)-20
        setPageNumber(num)
        setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${offset}`)
    }
      
    return (
       
    <div className = {style.fondo}>
        <Navbar name ={name} setName={setName} ></Navbar>
        <button onClick={() => reloadAll()} className={style.poke}><img src={poke} alt="pokebola" width='20px'/> Reload all</button>

        <div className={style.sortfilter}>
                <select onChange={(e) => handleSort(e)}>
                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">Highest Attack</option>
                    <option value="LAttack">Lowest Attack</option>
                </select>
                
                <select onChange={(e) => handleFilterByType(e.target.value)}>
                    <option value="All">all types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
            </div>


        <Paginado resultsFiltered = {resultsFiltered} pageNumber = {pageNumber} goToNumber ={goToNumber}></Paginado>
        
        <div className={style.home}>

            {/* Si aun no cargo allPokemons, entonces muestro el loading */}
                {allPokemons.length === 0 
                ? 
                (
                    <h3>
                        <img src={Loading} className={style.loading} alt="Loading..." />
                    </h3>
                ) 
                :
                   resultsFiltered.length === 0 
                   ?
                   (
                    <h3>
                        <img src="images/searchNotFound.gif" className={style.loading} alt="NotFound..." />
                        
                    </h3>
                   )
                   :
                   (
                    /* si ya cargo el allPokemons entonces mapeo la variable */
                    console.log('rednder card'),
                    resultsFiltered.map(poke => {
                        return (
                            <Card key={poke.data.id} poke={poke.data}>
                                {console.log(poke.data.name)}
                            </Card>
                        )
                    })
                   ) 
                }
            </div>
    </div>
  )
}

export default Home
