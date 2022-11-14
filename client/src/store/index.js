import { applyMiddleware,  legacyCreateStore as createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);