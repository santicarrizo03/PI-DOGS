import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAscOrDesc,
  filterByApiOrDb,
  filterByTemperament,
  getRaces,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allRaces = useSelector((state) => state.races);
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    if (allRaces.length < 1) dispatch(getRaces());
    if (races.length < 1) dispatch(getInfo());
    dispatch(getTemperaments());
    return () => {
      dispatch(resetRaces());
    };
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRaces);
  }

  //FILTERS

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
    <div>
      
      <h1>Dogs</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        volver a cargar todos los perrros
      </button>
      
      <div>
        <select className="filters" onChange={handleChangeFilterAsc}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="weightAsc">Higher Weight</option>
          <option value="weightDesc">Lower Weight</option>
        </select>
        <select className="filters" onChange={handleChangeFilter}>
          <option value="db">Data Base</option>
          <option value="api">Api</option>
        </select>
        <select
        className="filters"
        name="select"
        disabled={!temperaments}
        onChange={handleChangeTemp}
      >
        <option selected="selected" disabled={true}>
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
        <Link to="/dogs">Create a Race</Link>
      </div>
    </div>
  );
}


