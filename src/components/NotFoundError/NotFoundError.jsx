import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import style from '../NotFoundError/NotFoundError.module.css'
import notfound from '/images/notfound.png';


export default class NotFoundError extends Component {
  render() {
    return (
      <div className={style.home}>
        <Navbar></Navbar>
        <div className={style.text}>
          <h1>404</h1>
          <img src={notfound} alt="not found" width={'150px'}/>
          <h2>Page not found</h2>
        </div>
        
        
      </div>
    )
  }
}
