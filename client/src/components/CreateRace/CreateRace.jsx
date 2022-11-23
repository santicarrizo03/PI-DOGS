import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRace, getRaces, getTemperaments } from "../../actions";
import "./CreateRace.css"

const validateForm = (form) => {
  var errors = {};
  if (form.name.length < 1) errors.name = "A name is required";
  if (form.height < 1) errors.height = "You need to put height";
  if (form.weight < 1) errors.weight = "You need to put weight";
  return errors;
};

function CreateRace() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [form, setForm] = useState({
    name: "",
    weight: 0,
    height: 0,
    lifeYears: 0,
    temperaments: [],
  });
  const [errors, setErrors] = useState({});
  const handleAddTemp = (e) => {
    if (!form.temperaments.includes(e.target.value)) {
      setForm({
        ...form,
        temperaments: [...form.temperaments, e.target.value],
      });
    }
  };

  const history = useHistory();

  const handleRemoveTemp = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      temperaments: form.temperaments.filter((t) => t !== e.target.name),
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRace(form));
    setForm({
      name: "",
      weight: 0,
      height: 0,
      lifeYears: 0,
      temperaments: [],
    });
    alert("Dog created! Now, you are being redirectioned to the main page");
    history.push("/home");
  };
  useEffect(() => {
    dispatch(getTemperaments());
    setErrors(validateForm(form));
    return () => {
      dispatch(getRaces());
    };
  }, [dispatch, form]);
  return (
    <div className="background">
      <div className="container">
        <Link to="/home" ><button>Home</button></Link>
        <h1>Create a new Race/Dog</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="inputs">
            <label>Weight in kgs</label>
            <input
              name="weight"
              min={0}
              type="number"
              onChange={handleChange}
            />
            {errors.weight && <p className="danger">{errors.weight}</p>}
          </div>
          <div className="inputs">
            <label>Height in cm</label>
            <input
              name="height"
              min={0}
              type="number"
              onChange={handleChange}
            />
            {errors.height && <p className="danger">{errors.height}</p>}
          </div>
          <div className="inputs">
            <label>Years of life</label>
            <input
              name="lifeYears"
              min={0}
              type="number"
              onChange={handleChange}
            />
            {errors.lifeYears && <p className="danger">{errors.lifeYears}</p>}
          </div>
          <div>
            <select className="select" defaultValue="" onChange={handleAddTemp}>
              <option disabled value="">
                Choose a temperament
              </option>
              {temperaments.map((temp) => {
                return <option value={temp}>{temp}</option>;
              })}
            </select>
          </div>
          <div>
            {form.temperaments?.map((t) => (
              <button className="submit" name={t} onClick={handleRemoveTemp}>
                {t}
              </button>
            ))}
          </div>
          <div>
            {!errors.name && !errors.height && !errors.weight ? (
              <div>
                <button className="submit" type="submit">
                  Create
                </button>
              </div>
            ) : (
              <h3 className="danger">Required info is missing</h3>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRace;