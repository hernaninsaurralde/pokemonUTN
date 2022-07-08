import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className={style.position}>
      <div style={{ display: "flex", flexFlow: "column"}}>
        <img src="images/logo.png" alt="Ashe" width="400px" />
      
        <Link to = "/home" className={style.boton}>
          Home
        </Link>
      
      </div>
      <img src="images/Ashe.png" alt="Loading.." width="180px" />
      <footer className={style}>
        Project by Gabriel Antonietti and Ignacio Insaurralde
      </footer>
    </div>
  );
}
