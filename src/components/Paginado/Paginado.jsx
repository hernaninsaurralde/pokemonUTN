import React from 'react'
import style from './Paginado.module.css'

export default function Paginado({filteredList, currentPage, setCurrentPage}){
    
    const pageNumbers = []
    
    for (let i = 0 ; i < filteredList.length / 20 ; i++){
        pageNumbers.push(i + 1)
    }


    return(
        <nav >
            <ul className={style.pagination}>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} style={{ listStyle:'none' }}>
                           <button 
                                className={style.buttons} 
                                style={ currentPage === number ? {color:"white"} : {color: "#121212"}}
                                onClick={() => setCurrentPage(number)}>
                                    {number}
                                    </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}