import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRaceByName, resetRaces } from "../actions";

function SearchBar({ paged }) {
  const dispatch = useDispatch();
  const [race, setRace] = useState("");

  const handleInput = (e) => {
    e.preventdefault();
    setRace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    dispatch(getRaceByName(race));
    dispatch(resetRaces());
    setRace("");
    paged(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search"
          placeholder="Search a race.."
          value={race}
          onChange={handleInput}
        />
        <button className="searchSubmit" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

