import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {NavMenu} from './components/NavMenu';


function App() {


  let d;
  fetch('api/Home/Posts/Accident')
  .then((response) => response.json())
  .then((data) => console.log(data));


  return (
    <div className="App">
     <NavMenu></NavMenu>
    </div>
  );
}

export default App;
