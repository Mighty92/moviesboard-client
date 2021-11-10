import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./view/Home";
import Details from "./view/Details";
import NotFound from "./view/NotFound";
import AjoutFilm from "./view/AjoutFilm";
import ModificationPage from "./view/ModificationPage";

const App = () => {
  return (
    <>
       <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/ajout-film" exact component={AjoutFilm}/>
          <Route path="/details" exact component={Details}/>
          <Route path="/modificationPage" exact component={ModificationPage}/> 
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;