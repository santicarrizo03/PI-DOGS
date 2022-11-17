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
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allRaces = useSelector((state) => state.races);
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [DogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * DogsPerPage;
  const indexOdFirstDog = indexOfLastDog - DogsPerPage;
  const actualElements = races.slice(indexOdFirstDog, indexOfLastDog);
  const amountOfPages = races.length > 1 ? Math.ceil(races.length / 8) : 1;

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

  //PAGINADO

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      <div>
        <Paginado 
          dogsPerPage={dogsPerPage}
          allRaces={allRaces.length}
          paginado={paginado}
        />
      </div>
      <div className="cards">
        {actualElements.length > 0 ? (
          actualElements?.map((race) => {
            return (
              <Card
                key={race.id}
                id={race.id}
                name={race.name}
                temperament={race.temperament}
                weight={isNaN(race.id) ? race.weight : race.weight.metric}
                image={
                  race.image
                    ? race.image
                    : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                }
              />
            );
          })
        ) : (
          <div className="lds-heart">
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
