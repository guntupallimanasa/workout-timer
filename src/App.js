import './App.css';
import React, { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StartTimer from "./components/startTimer";
import Dashboard from './components/dashboard';

function App() {
 
  return (
    <div className="App">
      <Switch>
        <Route exact path="/startTimer">
          <StartTimer />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
