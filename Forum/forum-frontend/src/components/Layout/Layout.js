import React, { Component } from 'react';
import { Outlet } from "react-router-dom";
import { NavMenu } from '../NavMenu';
import './Layout.css';

export class Layout extends Component {

  render() {
    return (
      <div>
         <NavMenu/> 
         <div className='container mainContainer'>
            <Outlet />   
        </div>   
      </div>
    );
  }
}

export default Layout;