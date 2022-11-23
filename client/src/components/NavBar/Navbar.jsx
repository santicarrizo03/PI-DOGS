import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterAscOrDesc,
  filterByApiOrDb,
  filterByTemperament,
  resetRaces,
} from "../../actions/index";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css"

function Navbar({ paged }) {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [, setOrder] = useState("");

  const handleChangeTemp = (e) => {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    paged(1);
  };

  const handleChangeFilter = (e) => {
    e.preventDefault();
    dispatch(filterByApiOrDb(e.target.value));
    paged(1);
  };

  const handleChangeFilterAsc = (e) => {
    e.preventDefault();
    dispatch(resetRaces());
    dispatch(filterAscOrDesc(e.target.value));
    paged(1);
    setOrder(e.target.value);
  };

  return (
    <div className="navbar">
      <select className="filters" onChange={handleChangeFilterAsc}>
        <option selected="disabled" disabled={true}>
          Choose a filter
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="weightA">Weight +</option>
        <option value="weightD">Weight -</option>
      </select>
      <select className="filters" onChange={handleChangeFilter}>
        <option selected="disabled" disabled={true}>
          Choose info
        </option>
        <option value="db">Data Base</option>
        <option value="api">API</option>
      </select>
      <select
        className="filters"
        name="select"
        disabled={!temperaments}
        onChange={handleChangeTemp}
      >
        <option selected="selected">
          Choose a temperament
        </option>
        {temperaments ? (
          temperaments.map((temp) => {
            return <option value={temp}>{temp}</option>;
          })
        ) : (
          <option value="disabled">Loading</option>
        )}
      </select>
      <SearchBar paged={paged} />
      <Link to="/dog">
        <button className="create">Create a Race</button>
      </Link>
      
    </div>
  );
}

export default Navbar;
