import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRace, getRaces, getTemperaments } from "../actions";

const validateInput = (input) => {
  var err = {};
  if (input.name.length < 1) err.name = "Name is required";
  if (input.height < 1) err.height = "Height is required";
  if (input.weight < 1) err.weight = "Weight is required";
  return err;
};

function CreateRace() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    weight: 0,
    height: 0,
    lifeYear: 0,
    temperaments: [],
  });

  const [err, setErr] = useState({});
  const handleAddTemp = (e) => {
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  };

  const history = useHistory();

  function handleChange(e) {
    setInput({
      ...input,
      [e.value.name] : e.target.value,
    });
    console.log(input);
    setErr(validateInput(input))
  }
  const handleRemoveTemp = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: input.temperaments.filter((t) => t !== e.target.name),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRace(input));
    alert("Dog created! Now, you are being redirectioned to the main page");
    setInput({
      name: "",
      weight: 0,
      height: 0,
      lifeYears: 0,
      temperaments: [],
    });
    
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getTemperaments());
    setErr(validateInput(input));
    return () => {
      dispatch(getRaces());
    };
  }, [dispatch, input]);

  return (
    <div>
      <div>
        <Link to="/home"><button>Volver</button></Link>
        <h1>Crear Raza</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              
              onChange={(e)=>handleChange(e)}
            />
            {err.name && <p className="danger">{err.name}</p>}
          </div>
          <div>
            <label>Weight in kg</label>
            <input
              type="number"
              name="weight"
              min={0}
              
              onChange={(e)=>handleChange(e)}
            />
            {err.weight && <p className="danger">{err.weight}</p>}
          </div>
          <div>
            <label htmlFor="">Height in cm</label>
            <input
              type="number"
              name="height"
              min={0}
              
              onChange={(e)=>handleChange(e)}
            />
            {err.height && <p className="danger">{err.height}</p>}
          </div>
          <div>
            <label htmlFor="">Years of life</label>
            <input
              type="number"
              name="lifeYears"
              min={0}
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div>
            <select defaultValue="" onChange={handleAddTemp}>
              <option disabled value="">choose temperament</option>
              {temperaments.map((temp) => {
                return <option value={temp}>{temp}</option>;
              })}
            </select>
          </div>
          <div>
            {input.temperaments?.map((t) => (
              <button className="submit" name={t} onClick={handleRemoveTemp}>
                {t}
              </button>
            ))}
          </div>
          <div>
            {!err.name && !err.height && !err.weight ? (
              <div>
                <button className="submit" type="submit">
                  Create
                </button>
              </div>
            ) : (
              <h3 className="danger">missing info</h3>
            )}
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default CreateRace;
