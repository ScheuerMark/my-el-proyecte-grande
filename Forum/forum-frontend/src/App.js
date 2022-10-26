import './App.css';
import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import Home from './components/Home';
import Topic from './components/Topic';
import PostDetails from './components/PostDetails';
import { Login } from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/PostDetail/:id' element={<PostDetails/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
