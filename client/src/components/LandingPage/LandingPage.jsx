import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
  return(
    <div className="landing-page">
      <h1>Welcome to PI-Dogs</h1>
      <Link to="/home" >
        <button>Ingresar</button>
      </Link>
    </div>
  )
}