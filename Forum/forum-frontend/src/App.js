import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import Home from './components/Home';
import Topic from './components/Topic';


function App() {
  return (
    <div className="App">   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/Topic' element={<Topic/>} /> {/*For test*/}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
