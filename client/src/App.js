import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/Home";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exath path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
