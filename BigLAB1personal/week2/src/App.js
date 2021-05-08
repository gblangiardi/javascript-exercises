import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./App.css"
import MyNavbar from "./MyNavbar";
import MainContent from "./MainContent"
import {BrowserRouter as Router} from 'react-router-dom' ;
import {Switch, Route} from 'react-router-dom'


function App() {
  
  return (
    <>
      <Router>
        <MyNavbar/>
        <Switch>
          <Route exact path='/'>
            <MainContent filter='All'/>
          </Route>
          <Route path='/all'>
            <MainContent filter='All'/>
          </Route>
          <Route path='/important'>
            <MainContent filter='Important'/>
          </Route>
          <Route path='/today'>
            <MainContent filter='Today'/>
          </Route>
          <Route path='/next7days'>
            <MainContent filter='Next 7 Days'/>
          </Route>
          <Route path='/private'>
            <MainContent filter='Private'/>
          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;