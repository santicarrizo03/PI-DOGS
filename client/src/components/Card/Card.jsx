import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

function Card({ name, image, temperament, weight, id }) {
  
  return (
    <div className="card">
      
      <Link to={`/dogs/${id}`}>
        <h2 className="name">{name}</h2>
        <img src={image} alt={name} width={400} />
        
        <p>{temperament}</p>
        <p>{weight} kgs</p>
        
      </Link>
      
    </div>
  );
}

export default Card;