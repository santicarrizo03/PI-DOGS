import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRaces,
  getInfo,
  getTemperaments,
  resetRaces,
} from "../../actions/index";
import Card from "../Card/Card";
import Navbar from "../NavBar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const allRaces = useSelector((state) => state.races);
  const races = useSelector((state) => state.showRaces)
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOdFirstDog = indexOfLastDog - dogsPerPage;
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

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage !== amountOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="home">
      <Navbar paged={changePage}/>
      <button className="prev-next" onClick={handlePrev}>
        Prev
      </button>
      <span>
        Page {currentPage} of {amountOfPages}
      </span>
      <button className="prev-next" onClick={handleNext}>
        Next
      </button>
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
      <div className="pagedFoot">
        <button className="prev-next" onClick={handlePrev}>
          Prev
        </button>
        <span>
          Page {currentPage} of {amountOfPages}
        </span>
        <button className="prev-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
