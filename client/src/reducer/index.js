const inicialState = {
  races: [],
  showRaces: [],
  detail: {},
  temperaments: [],
};

function rootReducer(state = inicialState, action) {
  switch(action.type){
    case "GET_RACES":
      return {
        ...state,
        races: action.payload,
        showRaces: action.payload,
      }
  }
}

export default rootReducer;
