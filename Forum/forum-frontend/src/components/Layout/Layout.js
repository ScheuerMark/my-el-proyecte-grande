import React, { Component } from 'react';
import { Outlet } from "react-router-dom";
import { NavMenu } from './NavMenu';
import './Layout.css';

export function Layout () {
    return (
      <div>
         <NavMenu/> 
         <div className='container mainContainer'>
            <Outlet />   
        </div>   
      </div>
    );
}