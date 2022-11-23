import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import CreateRace from "./components/CreateRace/CreateRace";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/dogs/:id" component={Detail} />
          <Route path="/dog" component={CreateRace} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
