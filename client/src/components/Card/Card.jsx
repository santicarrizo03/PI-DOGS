import React from "react";
import { Link } from "react-router-dom";

function Card({ name, image, temperament, weight, id }) {
  // const dispatch = useDispatch();
  // const handleClick = (e) => {
  //   dispatch(getRaceById(id));
  // };
  // onClick={handleClick}
  return (
    <div className="card">
      <Link to={`/dogs/${id}`}>
        <h2>{name}</h2>
        <img src={image} alt={name} width={400} />
        <p>{temperament}</p>
        <p>{weight} kgs</p>
      </Link>
    </div>
  );
}

export default Card;