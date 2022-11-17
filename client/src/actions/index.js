import axios from "axios";

export function getRaces(){
  return async function(dispatch) {
    var json = await axios.get("http://localhost:3001/dogs",);
    return dispatch({
      type: "GET_RACES",
      payload: json.data

    })
  }
}
export function getRaceByName(name) {
  return async function (dispatch) {
    try {
      var namesData = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: "GET_RACE_BY_NAME",
        payload: namesData.data,
      });
    } catch (error) {
      alert("The dog you are searching, doesn't exist, try again");
      return dispatch({ type: "GET_INFO" });
    }
  };
}

export const getRaceById = (id) => (dispatch) => {
  axios
    .get(`/dogs/${id}`)
    .then((r) => {
      return dispatch({ type: "GET_RACE_BY_ID", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createRace = (race) => (dispatch) => {
  axios
    .post("/dogs", race)
    .then((r) => {
      return dispatch({ type: "CREATE_RACE", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTemperaments = () => (dispatch) => {
  axios
    .get("/temperaments")
    .then((r) => {
      return dispatch({ type: "GET_TEMPERAMENTS", payload: r.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const filterByTemperament = (temperament) => (dispatch) => {
  return dispatch({ type: "FILTER_BY_TEMPERAMENT", payload: temperament });
};

export const filterByApiOrDb = (filter) => (dispatch) => {
  return dispatch({ type: "FILTER_DB_API", payload: filter });
};

export const filterAscOrDesc = (filter) => (dispatch) => {
  return dispatch({ type: "FILTER_ASC_DESC", payload: filter });
};

export const resetRaces = () => (dispatch) => {
  return dispatch({ type: "RESET_RACES" });
};

export const resetDetail = () => (dispatch) => {
  return dispatch({ type: "RESET_DETAIL" });
};

export const getInfo = () => (dispatch) => {
  return dispatch({ type: "GET_INFO" });
};