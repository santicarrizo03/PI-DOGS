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
      <input
        type="text"
        className="search"
        placeholder="Search a race.."
        onChange={handleInput}
      />
      <button
        className="searchSubmit"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
