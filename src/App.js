import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./view/Home";
import Details from "./view/Details";
import NotFound from "./view/NotFound";

const App = () => {
  return (
    <>
       <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/liste-evenements" exact component={List}/> */}
          <Route path="/details" exact component={Details}/>
          {/* <Route path="/favoris" exact component={Favoris}/>  */}
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;