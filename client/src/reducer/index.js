const initialState = {
  races: [],
  showRaces: [],
  detail: {},
  temperaments: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RACES":
      return {
        ...state,
        races: action.payload,
        showRaces: action.payload,
      };
    case "GET_RACE_BY_NAME":
      return {
        ...state,
        showRaces: action.payload,
      };
    case "GET_RACE_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "CREATE_RACE":
      return {
        ...state,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "FILTER_BY_TEMPERAMENT":
      const races = state.races;
      const filteredRaces = races.filter((race) => {
        if (race.temperament) return race.temperament.includes(action.payload);
        return false;
      });
      return {
        ...state,
        showRaces: filteredRaces,
      };
    case "FILTER_DB_API":
      const allRaces = state.races;
      if (action.payload === "db") {
        const filteredRaces = allRaces.filter((race) => {
          return isNaN(race.id);
        });
        return {
          ...state,
          showRaces: filteredRaces,
        };
      } else {
        const filteredRaces = allRaces.filter((race) => {
          return !isNaN(race.id);
        });
        return {
          ...state,
          showRaces: filteredRaces,
        };
      }
    case "FILTER_ASC_DESC":
      let order;
      if (action.payload === "asc") {
        order = state.races.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      if (action.payload === "desc") {
        order = state.races.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      if (action.payload === "weightA") {
        order = state.races.sort((a, b) => {
          const aWeight = a.weight.metric
            ? a.weight.metric.split(" ")
            : a.weight;
          const bWeight = b.weight.metric
            ? b.weight.metric.split(" ")
            : b.weight;
          if (Number(aWeight[0]) < Number(bWeight[0])) return -1;
          if (Number(aWeight[0]) > Number(bWeight[0])) return 1;
          return 0;
        });
      }
      if (action.payload === "weightD") {
        order = state.races.sort((a, b) => {
          const aWeight = a.weight.metric
            ? a.weight.metric.split(" ")
            : a.weight;
          const bWeight = b.weight.metric
            ? b.weight.metric.split(" ")
            : b.weight;
          if (Number(aWeight[0]) > Number(bWeight[0])) return -1;
          if (Number(aWeight[0]) < Number(bWeight[0])) return 1;
          return 0;
        });
      }
      return {
        ...state,
        showRaces: order,
      };
    case "RESET_RACES":
      return {
        ...state,
        showRaces: [],
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: {},
      };
    case "GET_INFO":
      return {
        ...state,
        showRaces: state.races,
      };
    default:
      return { ...state };
  }
}

export default reducer;



